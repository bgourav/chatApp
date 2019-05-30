var app=require('express')();
var http= require('http').Server(app);
var io=require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendfile('index.html');
});


users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log(data);
      
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is already taken. try a different one!');
      } else {
         users.push(data);
         socket.emit('setUser', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});


http.listen(3000, function(){
    console.log('listening on port 3000');
});
