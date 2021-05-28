const express = require('express');
const app = express();
var APIAI_TOKEN = "446fc107fdbd494ab0ea87989614aba1";
const apiai = require('apiai')(APIAI_TOKEN);
const APIAI_SESSION_ID = "1";

app.use(express.static(__dirname+'/views')); 
app.use(express.static(__dirname+ '/public'));

const server = app.listen(process.env.PORT || 5000, function()  {
  console.log('yess');
});

const io = require('socket.io')(server);

app.get('/', function(req,res){
res.sendFile("index.html");
});

io.on('connection', function(socket) {
	console.log('user connected');
 socket.on('chat message', (text) => {
   console.log('Message: ' + text);
    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });
    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      console.log("Reply: "  + aiText);
      socket.emit('bot reply', aiText); 
    });
    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

 });
});
