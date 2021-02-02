module.exports = {
  apps : [{
    script: 'index.js',
    watch: '.',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    exec_mode  : "cluster",
    instances: -1

  },],
  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
