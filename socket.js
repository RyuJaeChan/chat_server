var socketio = require('socket.io')

module.exports = function(server){
    var io = socketio.listen(server);
    console.log('ready for socketio request success')
    
    io.sockets.on('connection', function(socket){
        console.log('connection info : ' + socket.request._peername)
    
        socket.remoteAddress = socket.request.connection._peername.address;
        socket.remotePort = socket.request.connection._peername.port;
    
        socket.on('message', function(message){
            console.log('message event occur')
            console.dir(message); 
    
            
            if(message.recepient == 'All'){
                console.log('type = all')
                io.sockets.emit('message', message)
            }





            
        })
    })
}

