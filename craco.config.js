const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.devtool = false;
      return webpackConfig;
    },
  },
};
