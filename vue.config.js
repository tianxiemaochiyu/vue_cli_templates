const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const productionGzipExtensions = ['js', 'css']

module.exports = {
    outputDir: 'web_assets', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)
    publicPath: process.env.NODE_ENV === 'production' ?
        '/web_assets/' : '/', // 部署应用包时的基本 URL。
    // productionSourceMap: false,
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'));

        // 修改svg loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end();

        // 添加svg-sprite-loader
        config.module
            .rule('svgSpriteLoader')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();

        // 添加打包分析模式
        if (process.env.npm_config_report) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境 开启gzip
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            // 添加source map
            config.devtool = 'cheap-module-source-map'
            config.optimization = {
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            warnings: false,
                            compress: {
                                drop_console: true,//console
                                drop_debugger: true,
                                pure_funcs: ['console.log']//移除console
                            },
                            ie8: true,
                            safari10: true,
                        },
                    }),
                ]
            }
        }
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
        }
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                additionalData: `@import "@/assets/styles/global.scss";`
            }
        }
    },
    devServer: {
        port: 8080,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/test/api': {
                target: process.env.VUE_APP_HOST_TEST, // 接口的域名 test2:https://test2.example.cc
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/test/api': '/api'
                }
            },
            '/api': {
                target: 'https://' + process.env.VUE_APP_HOST_PROD, // 接口的域名
                secure: true, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
            },
        }
    },
    pluginOptions: {

    }
}