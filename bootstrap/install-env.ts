import fs from 'fs';

// writes to a local .env file if not on netlify servers
// used for local netlify dev command to indicate development environment

if (!process.env.NETLIFY && !fs.existsSync('.env')) {
    console.log('Not on Netlify, writing .env');
    fs.writeFileSync('.env', 'NODE_ENV=development');
}