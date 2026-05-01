#!/usr/bin/env node

/**
 * Slack OAuth 2.0 Authentication Script
 * 
 * This script helps set up OAuth for Slack MCP server.
 * 
 * Usage:
 *   node scripts/auth-slack.js
 * 
 * Prerequisites:
 *   1. Copy .env.example to .env and fill in CLIENT_ID and CLIENT_SECRET
 *   2. Configure OAuth Redirect URL in Slack App settings
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
    if (line && !line.startsWith('#') && !line.startsWith('===')) {
      const [key, ...valueParts] = line.split('=');
      if (key) envVars[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  return envVars;
}

const SLACK_SCOPES = [
  'channels:read',
  'chat:write',
  'users:read',
  'team:read',
  'channels:history',
  'groups:read'
];

function generateAuthUrl(clientId, redirectUri, scopes) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scopes.join(','),
    state: crypto.randomBytes(16).toString('hex')
  });
  
  return `https://slack.com/oauth/v2/authorize?${params.toString()}`;
}

async function exchangeCode(code, clientId, clientSecret, redirectUri) {
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri
  });
  
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'slack.com',
      path: '/api/oauth.v2.access',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.ok) {
            resolve(json);
          } else {
            reject(new Error(json.error || 'Unknown error'));
          }
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
      const errorDescription = parsedUrl.searchParams.get('error_description');
      
      if (code) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<html><body><h1>✅ Autenticación exitosa!</h1><p>Slack conectado. Puedes cerrar esta ventana.</p></body></html>');
        server.close();
        resolve(code);
      } else if (error || errorDescription) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<html><body><h1>❌ Error:</h1><p>${error || errorDescription}</p></body></html>`);
        server.close();
        reject(new Error(error || errorDescription));
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
  let port = 3001;
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' && args[i + 1]) {
      port = parseInt(args[i + 1], 10);
    }
  }
  
  console.log('🔐 Slack OAuth 2.0 Authentication Setup');
  console.log('====================================\n');
  
  const env = loadEnv();
  
  const clientId = env.SLACK_CLIENT_ID;
  const clientSecret = env.SLACK_CLIENT_SECRET;
  const redirectUri = `http://localhost:${port}/oauth_callback`;
  
  if (!clientId || clientId.includes('your-slack')) {
    console.error('❌ Please set SLACK_CLIENT_ID and SLACK_CLIENT_SECRET in .env');
    console.log('\n📝 Steps to create Slack App:');
    console.log('1. Go to https://api.slack.com/apps');
    console.log('2. Click "Create New App" > "From scratch"');
    console.log('3. Add OAuth Redirect URL: ' + redirectUri);
    console.log('   ( OAuth & Permissions > Redirect URLs)');
    console.log('4. Save and install app to workspace');
    console.log('5. Copy Client ID and Client Secret to .env');
    process.exit(1);
  }
  
  const authUrl = generateAuthUrl(clientId, redirectUri, SLACK_SCOPES);
  
  console.log('📋 Required OAuth Scopes:');
  SLACK_SCOPES.forEach(scope => console.log('   - ' + scope));
  console.log('');
  
  console.log('🔗 Opening authorization URL in browser...\n');
  console.log(authUrl);
  
  try {
    await open(authUrl);
  } catch (e) {
    // Continue without browser open
  }
  
  console.log('\n⏳ Waiting for authorization...');
  console.log(`   Server running at http://localhost:${port}/oauth_callback`);
  console.log('   (Press Ctrl+C to cancel)\n');
  
  try {
    const code = await startCallbackServer(port);
    
    console.log('\n🔄 Exchanging code for tokens...');
    const result = await exchangeCode(code, clientId, clientSecret, redirectUri);
    
    // Save tokens to .env
    const envPath = path.join(PROJECT_ROOT, '.env');
    
    const tokenLines = [
      `# === Slack OAuth Tokens (generated ${new Date().toISOString()}) ===`,
      `SLACK_BOT_TOKEN=${result.access_token}`,
      `SLACK_TEAM_ID=${result.team_id}`
    ];
    
    fs.appendFileSync(envPath, '\n' + tokenLines.join('\n') + '\n');
    
    console.log('\n✅ Authentication successful!');
    console.log('   Team: ' + result.team_name);
    console.log('\n📝 Tokens saved to .env file.');
    console.log('⚠️  Bot token provides full access to allowed channels.');
    
  } catch (error) {
    console.error('\n❌ Authentication failed:', error.message);
    console.log('\n📋 Alternative: Manual flow');
    console.log('1. Go to: ' + authUrl);
    console.log('2. Authorize the app');
    console.log('3. You\'ll be redirected with a code parameter');
    console.log('4. Run: node scripts/auth-slack.js --code YOUR_CODE');
    process.exit(1);
  }
}

main();