const withImages = require('next-images');

require('dotenv').config();

module.exports = withImages({
  inlineImageLimit: 1024,
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      });
    }

    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },
  onDemandEntries: {
    websocketPort: 3001,
  },
});
