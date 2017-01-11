const path = require('path');

module.exports = {
  type: 'react-app',
  babel: {
    stage: 0
  },
  webpack: {
    loaders: {
      jpeg: {
        name: 'assets/[name].[hash:8].jpg'
      },
      fonts: {
        name: 'fonts/[name].[hash:8].[ext]'
      },
      eot: {
        name: 'fonts/[name].[hash:8].[ext]'
      }
    },

    extra: {
      module: {
        preLoaders: [
          {
            test: /\.js$/,
            loaders: ['eslint'],
            include: [
              path.resolve(__dirname, "src"),
            ],
          }
        ],
      }
    }
  }
};
