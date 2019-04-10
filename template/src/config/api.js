/**
 * Created by catscorpio on 2019/3/11.
 */
const NODE_ENV = process.env.NODE_ENV || 'production';

export default {
    environment: NODE_ENV === 'production' ? false : true, // true：访问测试  false: 访问线上
}