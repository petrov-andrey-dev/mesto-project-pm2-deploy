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
      "pre-deploy": `scp ./backend/.env ${USER}@${HOST}:${PATH}/backend/.env`,
      "post-deploy": `cd ./backend && npm i && pm2 reload ecosystem.config.js --env production`,
    },
  },
};