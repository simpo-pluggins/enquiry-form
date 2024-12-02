const path = require('path');

module.exports = {
  entry: './dist/enquiry-form/fesm2022/enquiry-form.mjs', // Adjust the path to your compiled library
  output: {
    path: path.resolve(__dirname, 'dist-bundle'),
    filename: 'enquiry-form.bundle.js',
    library: 'EnquiryForm', // This defines the global object
    libraryTarget: 'umd', // UMD to support various module systems and global scope
    umdNamedDefine: true, // Name the AMD module, helpful in global contexts
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};