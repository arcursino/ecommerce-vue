import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.css'
import axios from 'axios'

axios.interceptors.request.use(config => {
  if(store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
});

axios.interceptors.response.use(res => {
    return res
  }, error => {
    if(error.response.status === 403) {
      alert('Não autorizado!')
    } else if (error.response.status === 401) {
       alert('Não autorizado!')
      //store.commit('logout')
      //router.push('')
    }
    throw error
});

//Sempre trocar o endereço do servidor
axios.defaults.baseURL = "https://8080-teal-panther-cn78i1gj.ws-us08.gitpod.io/ecommerce/";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')