require('dotenv').config({ path: './.env.deploy' });

const { HOST, USER, REPO, PATH, REF = 'origin/master' } = process.env;

module.exports = {
  apps: [
    {
      name: "mesto-backend",
      script: "./src/app.ts",
    },
  ],
  deploy: {
    production: {
      user: USER,
      host: HOST,
      ref: REF,
      repo: REPO,
      path: PATH,
      'pre-setup': `mkdir -p ${PATH}/source/backend`,
      'pre-deploy-local': `scp ./backend/.env ${USER}@${HOST}:${PATH}/source/backend/.env`,
      'post-deploy': `cd ${PATH}/source/backend && npm install && npm run build && pm2 reload ecosystem.config.js --env production`,
    },
  },
};