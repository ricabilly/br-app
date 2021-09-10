module.exports = {
  pwa: {
    name: "Chalk Wars",
  },
  devServer: {
    proxy: 'http://localhost',
  },
  configureWebpack: {
    devtool: 'source-map',
  },
};
