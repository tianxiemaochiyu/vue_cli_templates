/**
 * Created by catscorpio on 2019/4/10.
 */
module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        "dependencies": {
            "axios": "^0.19.2",
            "babel-polyfill": "^6.26.0",
            "bignumber.js": "^9.0.0",
            "core-js": "^3.6.5",
            "element-ui": "^2.13.2",
            "normalize.css": "^8.0.1",
            "nprogress": "^0.2.0",
            "vue": "^2.6.11",
            "vue-i18n": "^8.20.0",
            "vue-router": "^3.2.0",
            "vuex": "^3.4.0"
          },
          "devDependencies": {
            "@vue/cli-plugin-babel": "~4.5.0",
            "@vue/cli-plugin-eslint": "~4.5.0",
            "@vue/cli-plugin-router": "~4.5.0",
            "@vue/cli-plugin-vuex": "~4.5.0",
            "@vue/cli-service": "~4.5.0",
            "@vue/eslint-config-prettier": "^6.0.0",
            "babel-eslint": "^10.1.0",
            "babel-plugin-component": "^1.1.1",
            "compression-webpack-plugin": "^4.0.0",
            "eslint": "^6.7.2",
            "eslint-plugin-prettier": "^3.1.3",
            "eslint-plugin-vue": "^6.2.2",
            "husky": "^4.2.5",
            "lint-staged": "^10.2.11",
            "node-sass": "^4.12.0",
            "prettier": "^2.0.5",
            "sass-loader": "^9.0.3",
            "svg-sprite-loader": "^5.0.0",
            "terser-webpack-plugin": "^4.1.0",
            "vue-template-compiler": "^2.6.11"
          }
    });

    // 公共基础目录和文件
    api.render('./template');

    // 配置文件
    api.render({
        './.eslintrc.js': './_eslintrc.js',
        './.env': './_env',
        './.gitignore': './_gitignore',
        './.browserslistrc': './_browserslistrc',
        './.prettierrc': './_prettierrc',
        './babel.config.js': './babel.config.js',
        './postcss.config.js': './postcss.config.js',
        './vue.config.js': './vue.config.js'
    });
}