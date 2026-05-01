#!/usr/bin/env node

/**
 * Google OAuth 2.0 Authentication Script
 * 
 * This script helps set up OAuth credentials for:
 * - Google Drive (gdrive)
 * - Gmail (gmail)  
 * - Google Calendar (google-calendar)
 * 
 * Usage:
 *   node scripts/auth-google.js [--port 3000]
 * 
 * Prerequisites:
 *   1. Copy .env.example to .env and fill in your CLIENT_ID and CLIENT_SECRET
 *   2. Enable required APIs in Google Cloud Console
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import url from 'url';
import crypto from 'crypto';
import { open } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Load environment variables
function loadEnv() {
  const envPath = path.join(PROJECT_ROOT, '.env');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found. Copy .env.example to .env first.');
    process.exit(1);
  }
  
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  return envVars;
}

const GOOGLE_SCOPES = {
  drive: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.readonly'
  ],
  gmail: [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send'
  ],
  calendar: [
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.readonly'
  ]
};

function generateAuthUrl(clientId, redirectUri, scopes) {
  const scopeString = scopes.join(' ');
  const state = crypto.randomBytes(16).toString('hex');
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scopeString,
    access_type: 'offline',
    prompt: 'consent'
  });
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

async function exchangeCode(code, clientId, clientSecret, redirectUri) {
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri
  });
  
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(data));
        }
      });
    });
    
    req.on('error', reject);
    req.write(params.toString());
    req.end();
  });
}

function startCallbackServer(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const parsedUrl = new url.URL(req.url, `http://localhost:${port}`);
      const code = parsedUrl.searchParams.get('code');
      const error = parsedUrl.searchParams.get('error');
      
      if (code) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<html><body><h1>✅ Autenticación exitosa!</h1><p>Puedes cerrar esta ventana.</p></body></html>');
        server.close();
        resolve(code);
      } else if (error) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<html><body><h1>❌ Error:</h1><p>${error}</p></body></html>`);
        server.close();
        reject(new Error(error));
      } else {
        res.writeHead(404);
        res.end();
      }
    });
    
    server.listen(port, () => resolve(server));
  });
}

async function main() {
  const args = process.argv.slice(2);
  let port = 3000;
  let manualCode = null;
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' && args[i + 1]) {
      port = parseInt(args[i + 1], 10);
    }
    if (args[i] === '--code' && args[i + 1]) {
      manualCode = args[i + 1];
    }
  }
  
  console.log('🔐 Google OAuth 2.0 Authentication Setup');
  console.log('==========================================\n');
  
  const env = loadEnv();
  
  const clientId = env.GOOGLE_CLIENT_ID;
  const clientSecret = env.GOOGLE_CLIENT_SECRET;
  const redirectUri = env.GOOGLE_REDIRECT_URI || `http://localhost:${port}/callback`;
  
  if (!clientId || clientId.includes('your-client-id')) {
    console.error('❌ Please set GOOGLE_CLIENT_ID in .env');
    console.log('\n📝 Steps to get credentials:');
    console.log('1. Go to https://console.cloud.google.com/apis/credentials');
    console.log('2. Create OAuth 2.0 Client ID for Desktop app');
    console.log('3. Download JSON and copy values to .env');
    process.exit(1);
  }
  
  // Combine all scopes
  const allScopes = [
    ...GOOGLE_SCOPES.drive,
    ...GOOGLE_SCOPES.gmail,
    ...GOOGLE_SCOPES.calendar
  ];
  
  const authUrl = generateAuthUrl(clientId, redirectUri, allScopes);
  
  console.log('📋 Select services to authenticate:');
  console.log('  [1] Google Drive only');
  console.log('  [2] Gmail only');
  console.log('  [3] Google Calendar only');
  console.log('  [4] All services (default)\n');
  
  const allScopesStr = allScopes.join(' ');
  const authUrlAll = generateAuthUrl(clientId, redirectUri, allScopesStr.split(' '));
  
  console.log('🔗 Opening authorization URL in browser...\n');
  console.log(authUrlAll);
  console.log('\n---');
  console.log('If browser doesn\'t open automatically, copy the URL above and open it manually.');
  console.log(`\n📌 Make sure redirect URI is set to: ${redirectUri}`);
  console.log('   (Add this in Google Cloud Console > Credentials > OAuth Client)\n');
  
  // Try to open browser
  try {
    await open(authUrlAll);
  } catch (e) {
    // Continue without browser open
  }
  
  console.log('⏳ Waiting for authorization...');
  console.log(`   Server running at http://localhost:${port}/callback`);
  console.log('   (Press Ctrl+C to cancel)\n');
  
  try {
    const code = await startCallbackServer(port);
    
    console.log('\n🔄 Exchanging code for tokens...');
    const tokens = await exchangeCode(code, clientId, clientSecret, redirectUri);
    
    // Save tokens to .env
    const envPath = path.join(PROJECT_ROOT, '.env');
    let envContent = fs.readFileSync(envPath, 'utf-8');
    
    const tokenLines = [
      `# === Google OAuth Tokens (generated ${new Date().toISOString()}) ===`,
      `GOOGLE_ACCESS_TOKEN=${tokens.access_token}`,
      `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`
    ];
    
    fs.appendFileSync(envPath, '\n' + tokenLines.join('\n') + '\n');
    
    console.log('\n✅ Authentication successful!');
    console.log('\n📝 Tokens saved to .env file.');
    console.log('⚠️  Keep these tokens secure - they provide access to your Google account.');
    
  } catch (error) {
    console.error('\n❌ Authentication failed:', error.message);
    console.log('\n📋 Alternative: Manual flow');
    console.log('1. Copy the authorization URL above');
    console.log('2. Open it in your browser');
    console.log('3. After authorizing, you\'ll be redirected to');
    console.log(`   ${redirectUri}?code=...`);
    console.log('4. Copy the code parameter and run:');
    console.log(`   node scripts/auth-google.js --code YOUR_CODE`);
    process.exit(1);
  }
}

main();