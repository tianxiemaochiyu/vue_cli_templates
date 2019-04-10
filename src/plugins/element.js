import Vue from 'vue'
import {
    Loading,
    MessageBox,
    Message,
    Col,
    Row,
    Button,
    Input,
    Alert,
    Scrollbar
} from 'element-ui'

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Input);
Vue.use(Alert);
Vue.use(Scrollbar);