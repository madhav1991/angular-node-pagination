const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 3000;

function sendDataToClient() {
  dataToBeSent= [['call-1','call-2'],['call-2','call-3'],['call-3','call-4'],['call-4','call-5'],['call-5','call-6']];
  for(let i=0;i<dataToBeSent.length;i++){
    let interval = i === 0 ? 0 : 2^i%8;
    (function(i) {
     setInterval(() => serverToClient(dataToBeSent[i],interval))
    })(i);
  }
}

io.on('connection', (socket) => {
 console.log('user connected');
   socket.on('my message', (msg) => {
    
  });
});

io.on('new-message', (message) => {
  io.emit('test-message',message);
});

function duration(element){
  return element[element.length-1];
}

function idValue(element){
  return element.slice(0,4) + `__` + element[element.length-1];
}

function serverToClient(x){
  var obj={};
  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth(); 
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var dateString = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  
  for(let i=x.length-1; i>=0; i-- ){
    obj= {
    'Timestamp': dateString, 
    'ID': idValue(x[i]),
    duration: duration(x[i])
    }
    console.log('emitted', {obj: obj})
    io.emit('my broadcast',{obj: obj});
  }
}
console.log('data sent', sendDataToClient())

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});