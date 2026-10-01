module.exports = {
  apps: [
    {
      name: 'api',
      script: 'npm',
      args: 'start',
      env_production: {
         NODE_ENV: "production"
      },
    },
  ],
};
 
