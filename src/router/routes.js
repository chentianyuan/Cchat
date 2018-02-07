import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import home from '../components/page/home'
import main from '../components/page/main'
import mine from '../components/page/mine'
import chat from '../components/page/chat'
import PageTransition from '../components/PageTransition'

Vue.use(Router)
Router.prototype.go = function () {
    this.isBack = true
    window.history.go(-1)
}
      

export default new Router({
    routes:[{
        path:'/',
        component: PageTransition, // 引入页面切换组件
        children:[
            {
                path:'',
                component:login,              
            },
            {
                path:'/Cchat',
                component:home,
                children:[{
                    path:'',
                    component:main
                },{
                    path:'mine',
                    component:mine
                },{
                    path:'chat/:id',
                    component:chat
                }]
            }
        ]}
    ]
})