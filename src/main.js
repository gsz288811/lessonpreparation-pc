// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)



import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false


axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers.post["Authorization"] = "test_token";
Vue.prototype.$ajax = axios;
Vue.prototype.$qs = qs;


function GetQueryString(key){
    var url = document.location.toString();
　　　　var arrObj = url.split("?");

　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;

　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");

　　　　　　　　if (arr != null && arr[0] == key) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}

}

// var userId = GetQueryString("userId")
// var userName = GetQueryString("userName")
// var fkSchoolId = GetQueryString("fkSchoolId")
// var schoolName = GetQueryString("schoolName")

var test_token = "test_token"
// console.log(test_token)
Vue.prototype.changeData = function (){
	return{
			Authorization:test_token,
	}

}

Vue.prototype.contentPath = function (){

	 return {

		 "ypt":'http://192.168.0.252',
     "baseUrl":'http://192.168.0.252/zhjy-basedata-customer',
     "lhf":'http://192.168.0.144:8080/',//李鸿飞路径

	 }

}






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
