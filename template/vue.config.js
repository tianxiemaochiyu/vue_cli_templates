/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const productionGzipExtensions = ["js", "css", "png", "webp"];

module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((options) => {
      options[0].title = process.env.VUE_APP_NAME;
      return options;
    });
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("svgSpriteLoader")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    config.module
      .rule("mjs")
      .test(/\.mjs$/)
      .include.add(/node_modules/)
      .end()
      .type("javascript/auto")
      .end();
    return;
  },
  configureWebpack: (config) => {
    // gzip
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      })
    );
    // source map
    config.devtool = "cheap-module-source-map";
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, //console
              drop_debugger: true,
              pure_funcs: ["console.log"], //remove console
            },
            ie8: true,
            safari10: true,
          },
        }),
      ],
    };
  },
  devServer: {
    port: 8080,
    proxy: {
      "/test/api": {
        target: "https://test.net",
        pathRewrite: {
          "^/test/api": "/api",
        },
      },
      "/api": {
        target: "https://main.net",
        pathRewrite: {
          "^api": "/api",
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/var.scss";`,
      },
    },
  },
};
