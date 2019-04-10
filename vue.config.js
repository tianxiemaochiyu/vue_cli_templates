/**
 * Created by catscorpio on 2019/3/11.
 */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    outputDir: 'web_assets', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)
    publicPath: process.env.NODE_ENV === 'production' ?
        '/' : '/', // 部署应用包时的基本 URL。
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...

            // gzip压缩
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }));

            // 去除多余代码
            config.plugins.push(
                new UglifyJsPlugin({
                    // 最小压缩配置
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_debugger: true,
                            drop_console: true,
                        },
                        output:{
                            // 最紧凑的输出
                            beautify: false,
                            // 删除所有的注释
                            comments: false,
                        }
                    },
                    // 是否生成索引
                    sourceMap: false,
                    // 是否开启多线程压缩
                    parallel: true,
                    // 开启缓存
                    cache: true
                })
            )
        } else {
            // 为开发环境修改配置...
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'));

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
    },
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                data: `@import "@/assets/styles/var.scss";`
            }
        }
    },
    devServer: {
        compress: true,
        port: 8080,
        // proxy: {
            // '/test': {
            //     target: 'http://localhost:5000',
            //     pathRewrite: {
            //         '^/test' : ''
            //     }
            // }
        // }
    },
}

