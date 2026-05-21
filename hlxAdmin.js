// Make sure to run these commands in the terminal:
// npm install --save-dev dotenv axios
//
// Add in .env file with the content:
// AEM_AUTH_TOKEN=your-auth-token
//
// Add npm scripts in package.json:
// "clear-cache": "node hlxAdmin.js cache"

require('dotenv').config();
const axios = require('axios');

const ORG = 'thayara25';
const REPO = 'ue';
const BRANCH = 'main';

const { AEM_AUTH_TOKEN } = process.env;

async function clearCache() {
  if (!AEM_AUTH_TOKEN) {
    throw new Error('Missing AEM_AUTH_TOKEN in .env file');
  }

  const url = `https://admin.hlx.page/cache/${ORG}/${REPO}/${BRANCH}/*`;

  await axios.post(url, null, {
    headers: {
      'x-hlx-auth': AEM_AUTH_TOKEN,
    },
  });

  console.log('✅ Cache cleared:', url);
}

const command = process.argv[2];

if (command === 'cache') {
  clearCache().catch((error) => {
    console.error('❌ Cache clear failed');
    console.error(error.response?.data || error.message);
    process.exit(1);
  });
} else {
  console.log('Usage: node hlxAdmin.js cache');
}