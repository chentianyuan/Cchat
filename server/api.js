//使用 express.Router 类来创建可安装的模块化路由处理程序
const express = require('express')
const router = express.Router()
const db = require('./db')
const axios = require('axios')
const utils = require('utility')


// 登陆
router.post('/api/login',(req,res)=>{
    db.User.find({},(err,doc)=>{
        let { user,pwd } = req.body
        for(value of doc){
            if(user == value.name && md5Pwd(pwd) == value.pwd){
                req.session.userName = user
                res.send({state:1,msg:'登陆成功'})
                return 
            }
            if(user == value.name && md5Pwd(pwd) != value.pwd){
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
        db.User.findOne({name:user},(err,doc)=>{
            if(doc){
                return res.json({state:0,msg:'用户名重复'})
            }
            // 未重复则创建之
            db.User.create({name:user,pwd:md5Pwd(pwd)},(err,doc)=>{
                if(!err){
                    res.send({state:1,msg:'注册成功'})
                }else{
                    res.send({state:0,msg:'注册失败'})
                }
            })
        })
})

// 聊天内容
router.get('/api/chatContent',(req,res)=>{
    db.Chat.find({},(err,doc)=>{
        if(!err){
            res.send({state:1,msg:doc})
        }else{
            res.send({state:0,msg:'查询失败'})
        }
    })
})

router.post('/api/chatEnter',(req,res)=>{
    let { user,date,content,roomId } = req.body
    db.Chat.create({user:user,date:date,content:content,roomId:roomId},(err,doc)=>{
        if(!err){
            res.send({state:1,msg:'存储成功'})
        }else{
            res.send({state:0,msg:'存储失败'})
        }
    })
})

router.post('/api/robot',(req,res)=>{
    let { key,appid,msg } = req.body
    // 写在url中的参数最好encode之后再交由后端解码,英文则无需解码
    axios.get(`http://api.qingyunke.com/api.php?key=${ key }&appid=${ appid }&msg=${ encodeURI(msg) }`,{header:'application/json'}).then((response)=>{
        // console.log(response.data)
        res.send(response.data)
    }).catch(err=>{
        // console.log(err)
        res.send({content:'接口挂了亲...'})
    })
})

// 加盐加密
function md5Pwd(pwd){
    const salt = 'wo_de_salt'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = router