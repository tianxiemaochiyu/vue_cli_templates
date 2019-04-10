/**
 * Created by catscorpio on 2019/4/10.
 */
module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        "dependencies": {
            "axios": "^0.18.0",
            "babel-polyfill": "^6.26.0",
            "element-ui": "^2.6.1",
            "nprogress": "^0.2.0",
            "vue": "^2.6.6",
            "vue-i18n": "^8.9.0",
            "vue-router": "^3.0.1",
            "vuex": "^3.0.1"
        },
        "devDependencies": {
            "@vue/cli-plugin-babel": "^3.5.0",
            "@vue/cli-plugin-eslint": "^3.5.0",
            "@vue/cli-service": "^3.5.0",
            "babel-eslint": "^10.0.1",
            "babel-plugin-component": "^1.1.1",
            "compression-webpack-plugin": "^2.0.0",
            "eslint": "^5.8.0",
            "eslint-plugin-vue": "^5.0.0",
            "node-sass": "^4.9.0",
            "sass-loader": "^7.1.0",
            "svg-sprite-loader": "^4.1.3",
            "uglifyjs-webpack-plugin": "^2.1.2",
            "vue-template-compiler": "^2.5.21"
        }
    });

    // 公共基础目录和文件
    api.render('./template');

    // 配置文件
    api.render({
        './.eslintrc.js': './_eslintrc.js',
        './.gitignore': './_gitignore',
        './.browserslistrc': './_browserslistrc',
        './babel.config.js': './babel.config.js',
        './postcss.config.js': './postcss.config.js',
        './vue.config.js': './vue.config.js'
    });
}