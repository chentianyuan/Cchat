//使用 express.Router 类来创建可安装的模块化路由处理程序
const express = require('express')
const router = express.Router()
const db = require('./db')

// 登陆
router.post('/api/login',(req,res)=>{
    db.User.find({},(err,doc)=>{
        let { user,pwd } = req.body
        for(value of doc){
            if(user == value.name && pwd == value.pwd){
                req.session.userName = user
                console.log(req.session)
                res.send({state:1,msg:'登陆成功'})
                return 
            }
            if(user == value.name && pwd != value.pwd){
                console.log(user,pwd)
                res.send({state:0,msg:'密码输入错误，请重新输入'})
                return
            }
        }
        res.send({state:9,msg:'无此用户，请注册'})
    })
})

//注册
router.post('/api/register',(req,res)=>{
        let { user,pwd } = req.body
        db.User.create({name:user,pwd:pwd},(err,doc)=>{
        if(!err){
            res.send({state:1,msg:'注册成功'})
        }else{
            res.send({state:0,msg:'注册失败'})
        }
    })
})

module.exports = router