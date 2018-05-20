import Vue from 'vue'
import Router from 'vue-router'
// import login from '../components/login'
// import home from '../components/page/home'
// import main from '../components/page/main'
// import mine from '../components/page/mine'
// import chat from '../components/page/chat'
import PageTransition from '../components/PageTransition'

Vue.use(Router)
Router.prototype.go = function () {
    this.isBack = true
    window.history.go(-1)
}
      

export default new Router({
    mode:'hash',
    routes:[{
        path:'/',
        component: PageTransition, // 引入页面切换组件
        children:[
            {
                path:'',
                name:'login',
                // component:login,              
                component:()=>import('../components/login.vue')
            },
            {
                path:'/Cchat',
                // name:'home',
                // component:home,
                component:()=>import('../components/page/home.vue'),                
                children:[{
                    path:'',
                    name:'main',
                    // component:main
                    component:()=>import('../components/page/main.vue')                    
                },{
                    path:'mine',
                    name:'mine',
                    // component:mine
                    component:()=>import('../components/page/mine.vue')
                },{
                    path:'chat/:id',
                    name:'chat',
                    // component:chat
                    component:()=>import('../components/page/chat.vue')                
                }]
            }
        ]}
    ]
})