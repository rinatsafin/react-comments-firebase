const NODE_ENV = process.env.NODE_ENV || "development";
const devMode = NODE_ENV === "development";
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const extractCSS = new ExtractTextPlugin("css/styles.css", { allChunks: true });

module.exports = {
  entry: "./app/components/App.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  watch: devMode,
  devtool: devMode && "eval-source-map",
  mode: NODE_ENV,
  module: {
    rules: [
      // {
      //   test: /\.js/,
      //   enforce: "pre",
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "eslint-loader",
      //   },
      // },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   // only modules way without files:
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     "style-loader",
      //     {
      //       loader: "css-loader",
      //       options: {
      //         modules: true,
      //         localIdentName:
      //           NODE_ENV === "development"
      //             ? "[name]__[local]__[hash:base64:5]"
      //             : "[hash:base64:12]",
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: devMode
                ? "[name]__[local]__[hash:base64:5]"
                : "[hash:base64:12]"
            }
          }
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: "style-loader",
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractCSS,
    new CopyWebpackPlugin([
      {
        from: path.resolve("./app/static"),
        to: path.resolve("./public")
      }
    ]),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(devMode)
    })
  ]
};
