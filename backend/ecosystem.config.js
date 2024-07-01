require('dotenv').config({ path: './.env.deploy' });

const { DEPLOY_HOST, DEPLOY_USER, DEPLOY_REPO, DEPLOY_PATH, DEPLOY_REF = 'origin/master' } = process.env;

module.exports = {
  apps: [
    {
      name: "mesto-backend",
      script: "./src/app.ts",
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/backend/.env`,
      'post-deploy': `cd ${DEPLOY_PATH}/source/backend && npm install  && pm2 reload ecosystem.config.js --env production`,
    },
  },
};