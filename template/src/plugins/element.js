import Vue from "vue"
import {
    Loading,
    MessageBox,
    Message,
    Button,
    Dialog,
    Col,
    Row,
} from "element-ui"
// 按需引入element-ui的部分功能
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Col)
Vue.use(Row)
