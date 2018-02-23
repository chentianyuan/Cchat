// 单独把websocket拿出来作为一个模块
function websocket(server) {
    var io = require('socket.io')(server);

    io.on('connection', (socket)=>{
        socket.on('send message',()=>{
            //前端触发了聊天事件，后端对传来的数据进行处理
            //io.emit给每个客户端发送事件
            //前端触发聊天事件，因为需要广播到所有的socket，广播的操作前端做不到，只能由后端来做，这里的io.emit就是广播方法的一种
            io.sockets.emit('chat message')
        })
      socket.on('disconnect',()=>{
      })
    })
}

module.exports = websocket