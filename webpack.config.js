const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next')

const cssLoader = "css-loader";

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      require('autoprefixer')()
    ]
  }
};

module.exports = function(env, { runTest }) {
  const production = env === 'production' || process.env.NODE_ENV === 'production';
  const test = env === 'test' || process.env.NODE_ENV === 'test';
  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'source-maps' : 'inline-source-map',
    entry: test ? './test/all-spec.js' :  './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'entry-bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
      historyApiFallback: true,
      open: !process.env.CI,
      port: 9000,
      lazy: false
    },
    module: {
      rules: [
        { test: /\.css$/i, issuer: /\.(js|ts)$/, use: [ "to-string-loader", cssLoader, postcssLoader ] },
        { test: /\.css$/i, issuer: /\.html$/, use: [ "to-string-loader", cssLoader, postcssLoader ] },
        { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
        {
          test: /\.html$/i,
          use: {
            loader: '@aurelia/webpack-loader',
            options: {
              // The other possible Shadow DOM mode is "closed".
              // If you turn on "closed" mode, there will be difficulty to perform e2e
              // tests (such as Cypress). Because shadowRoot is not accessible through
              // standard DOM APIs in "closed" mode.
              defaultShadowOptions: { mode: 'open' }
            }
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.ejs' }),
      test && runTest && new WebpackShellPluginNext({ onBuildEnd: [ 'npm run test:headless' ]})
    ].filter(p => p)
  }
}
