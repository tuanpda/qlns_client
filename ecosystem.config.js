module.exports = {
  apps: [
    {
      name: "client_mtdthatinh",
      exec_mode: "cluster",
      instances: "max",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
    },
  ],
};
