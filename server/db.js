// 引入mongoose
const mongoose = require('mongoose')
// 创建Schema解决方案
const Schema = mongoose.Schema

// 需要特定的Schema创建特定的model,从而操作数据库,model.find(),model.update()等
const userSchema = new Schema({
    name: String,
    pwd: String
})

const chatSchema = new Schema({
    user: String,
    content: String,
    date: Number,
    roomId: Number 
})

const Models = {
    // model自动寻找传入模型名称的复数版本,并转为小写，所以这边变成了users
    User: mongoose.model('User',userSchema),
    Chat: mongoose.model('Chat',chatSchema)
}

// 连接数据库
mongoose.connect('mongodb://127.0.0.1/Cchat',()=>{
    console.log('已经连接到Cchat数据库')    
})

// connection只是一个状态属性，要连接到数据库还是得用connect
// mongoose.connection

module.exports = Models