//使用 express.Router 类来创建可安装的模块化路由处理程序
const express = require('express')
const router = express.Router()
const db = require('./db')
const axios = require('axios')
const utils = require('utility')
const formidable = require('formidable')
// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart()

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
            db.User.create({name:user,pwd:md5Pwd(pwd)},{'pwd':0},(err,doc)=>{
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
        // session可以存储各种用户信息以做标识
        console.log(req.session.userName)
        console.log(req.sessionID)
        // session存储于内存中，sessionID是session认证的唯一标识
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
        res.send(response.data)
    }).catch(err=>{
        res.send({content:'接口挂了亲...'})
    })
})

router.post('/api/getUserAvatar',(req,res)=>{
    var {userName} = req.body
    db.Base.findOne({user:userName},(err,doc)=>{
        if(err){
            res.send({state:0,msg:'查询头像失败，显示默认头像'})
        }else{
            res.send({state:1,msg:doc})
        }
    })
})

const qnconfig = require('./config.js')

router.get('/api/token',(req,res)=>{
    // 返回上传七牛云所需的token
    res.status(200).send(qnconfig.uploadToken)    
})

router.post('/api/upload',(req,res)=>{
    // formidable应用
    var form = formidable.IncomingForm() , userName , fileName
    // form.uploadDir =  './static/img'
    form.encoding = 'utf-8'
    // 保留原扩展名，否则会被转成base64格式
    form.keepExtensions = true

    // 上传过程中，检测field类型名称
    form.on('field', (field, value) => {
        if(field === 'user'){
            userName = value
        }
        if(field === 'path'){
            filePath = value
        }
    });
    form.parse(req, function(err, fields, files) {
        if(err){
            res.send({state:0,msg:'存储失败'})
        }
        // const avatar = files.file
        // 传相对路径，webpack自动解析
        // const filePath = avatar.path
        db.Base.findOne({user:userName},(err,doc)=>{
            if(doc){
                //设置新值
                var newValue = {$set:{user:userName, base:filePath}}
                db.Base.update({user:userName},newValue,(err,doc)=>{
                    err?res.send({state:0,msg:'修改失败'}):res.send({state:1,msg:'修改成功',path:filePath})
                })
            }else{
                // 第一次则创建之
                db.Base.create({user:userName,base:filePath},(err,doc)=>{
                    err?res.send({state:0,msg:'修改失败'}):res.send({state:1,msg:'修改成功',path:filePath})                
                })
            }
        })
    })
})

// 加盐加密
function md5Pwd(pwd){
    const salt = 'wo_de_salt'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = router