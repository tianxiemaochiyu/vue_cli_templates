/**
 * Created by catscorpio on 2019/4/10.
 */
module.exports = (api, options, rootOptions) => {
    api.extendPackage({
      "dependencies": {
        "assert": "^2.0.0",
        "axios": "^0.21.1",
        "lodash": "^4.17.21",
        "vue": "^3.0.0",
        "vue-router": "^4.0.0-0",
        "vuex": "^4.0.0-0"
      },
      "devDependencies": {
        "@types/assert": "^1.5.5",
        "@types/lodash": "^4.14.171",
        "@types/svg-sprite-loader": "^3.9.4",
        "@typescript-eslint/eslint-plugin": "^4.18.0",
        "@typescript-eslint/parser": "^4.18.0",
        "@vue/cli-plugin-babel": "~4.5.0",
        "@vue/cli-plugin-eslint": "~4.5.0",
        "@vue/cli-plugin-router": "~4.5.0",
        "@vue/cli-plugin-typescript": "~4.5.0",
        "@vue/cli-plugin-vuex": "~4.5.0",
        "@vue/cli-service": "~4.5.0",
        "@vue/compiler-sfc": "^3.0.0",
        "@vue/eslint-config-prettier": "^6.0.0",
        "@vue/eslint-config-typescript": "^7.0.0",
        "compression-webpack-plugin": "^6.1.1",
        "eslint": "^6.7.2",
        "eslint-plugin-prettier": "^3.3.1",
        "eslint-plugin-vue": "^7.0.0",
        "husky": "^7.0.1",
        "lint-staged": "^11.1.0",
        "prettier": "^2.2.1",
        "sass": "^1.26.5",
        "sass-loader": "^8.0.2",
        "svg-sprite-loader": "^6.0.9",
        "terser-webpack-plugin": "^4.2.3",
        "typescript": "~4.1.5"
      },
      "husky": {
        "hooks": {
          "pre-commit": "lint-staged"
        }
      },
      "lint-staged": {
        "src/**/*.{js,vue,jsx,ts,tsx,json,css,scss,md}": [
          "prettier --write"
        ],
        "src/*.{js,vue,jsx,ts,tsx,json,css,scss,md}": [
          "prettier --write"
        ]
      }
    });

    // render project dir
    api.render('./template');
}

module.exports.hooks = (api) => {
  api.afterInvoke(() => {
    const fs = require('fs');
    fs.writeFileSync(api.resolve("./.env"), `VUE_APP_NAME=${api.rootOptions.projectName}`, { encoding: 'utf-8' })
  })
}