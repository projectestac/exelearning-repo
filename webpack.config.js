/*global module, require, __dirname */

const path = require('path');
const pkg = require('./package.json');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const date = new Date();

const banner = `
${pkg.name} version ${pkg.version} (${date.toISOString().substr(0, 10)})
${pkg.description}
${pkg.homepage}
 
(c) ${date.getFullYear()} ${pkg.author.name || pkg.author}

Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
the European Commission- subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:
https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12

Unless required by applicable law or agreed to in writing, software
distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
Licence for the specific language governing permissions and limitations
under the Licence.

For full license information of included components please see: components.LICENSE

WARNING: This is a compressed version of "${pkg.name}". Full source code is freely available at:
${pkg.repository.url}
`;

/**
 * Inline assets as raw text or Base64 URIs
 * See: https://webpack.js.org/guides/asset-modules/
 */
const assetRules = [
  {
    test: /\.css$/,
    type: 'asset/source',
  },
  {
    test: /\.svg$/,
    type: 'asset/source',
  },
  {
    test: /\.png$/,
    type: 'asset/inline',
  },
  {
    test: /\.mp3$/,
    type: 'asset/inline',
  },
];

module.exports = {
  mode: 'production',
  entry: './src',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${pkg.name}.min.js`,
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          }
        },
      },
      ...assetRules,
    ]
  },
  plugins: [
    new Dotenv(),
  ],
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'test'),
    watchContentBase: true,
    compress: true,
    port: 9001,
    overlay: true,
    public: 'localhost:9001',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: {
          //condition: /^\!/,
          filename: `${pkg.name}.components.LICENSE`,
          banner: () => banner,
        },
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  },
};