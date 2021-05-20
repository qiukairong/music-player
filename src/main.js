import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


/*vue路由使用
 *1.导入
 *2.use()
 *3.创建路由
 *4.挂载到Vue实例
 */

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import discovery from './components/03.discovery.vue'
import playlists from './components/04.playlists.vue'
import songs from './components/05.songs.vue'
import mvs from './components/06.mvs.vue'
import result from './components/07.result.vue'

let router = new VueRouter({
    routes: [{
            //空地址，默认地址
            path: "/",
            redirect: '/discovery'
        },
        {
            path: "/discovery",
            component: discovery
        },
        {
            path: "/playlists",
            component: playlists
        },
        {
            path: "/songs",
            component: songs
        },
        {
            path: "/mvs",
            component: mvs
        },
        {
            path: "/result",
            component: result
        }
    ]
})

new Vue({
    render: h => h(App),
    router // router:router
}).$mount('#app')