import Vue from 'vue'
import axios from 'axios'

//axios.defaults.baseURL = 'https://curso-vue-2db8d.firebaseio.com/'
/* axios.defaults.headerss.common['Authorization'] = 'abc123'
axios.defaults.headerss.get['Accepts'] = 'application/json' */

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-2db8d.firebaseio.com/',
            headers: {
                "Authorization": "abc123"
            }
        })

        /* Vue.prototype.$http.interceptors.request.use(config => {
            console.log(config.method)
            return config
        }, error => Promise.reject(error)) */

        /* Vue.prototype.$http.interceptors.response.use(res => {
            const array = []
            for (let chave in res.data) {
                array.push({
                    //id:chave, ...res.data[chave] }
                    id:chave, nome: res.data[chave].nome, email: res.data[chave].email }
                    )
                }
            res.data = array
            return res
        }, error => Promise.reject(error)) */
    }
})