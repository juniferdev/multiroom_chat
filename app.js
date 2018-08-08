
var app = require('./config/server');

var server = app.listen(80, function(){
    console.log('Servidor rodando na porta 80...');
});

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){
    
    console.log('Usuário conectou');

    socket.on('disconnect',function(){
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor',function(data){
        // Enviando minha mensagem para mim mesmo
        socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
        // Enviando minha mensagem para todos menos eu
        socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
    });
});
