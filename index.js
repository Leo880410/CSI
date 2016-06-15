var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var users = [];
var messages = [];

/*
* Scenario1. 基本對話
* 1.  客戶取一個名字開啟對話框
* 2.  客服得知有新的對話框
* 3.  客戶發言
* 4.  客服收到客戶的訊息
* 5.  客服回覆訊息給客戶
* 6.  客戶收到客服的訊息
* 7.  客戶關閉對話框
* 8.  客戶在一天內接續這一次的對話
* 9.  客戶發言
* 10. 客服收到客戶的訊息
* 11. 客服回覆訊息給客戶
* 12. 客戶收到客服的訊息
* 13. 客戶關閉對話框
* 14. 就此結束
*
* Scenario2. 客服查詢客戶歷史訊息
* 1.  客服打開對話清單
* 2.  客服選擇想要看的對話清單
* 3.  客服取得此對話清單的歷史訊息
*
* Scenario3. 客戶接續前一次對話
* 1.  客戶打開網頁
* 2.  客戶選擇接續前一次對話
* 3.  客戶取得對話清單的歷史紀錄
*
*
*
* 1.  客戶打開網頁
* 2.  客戶輸入名稱
* 3.  客戶建立聊天室
* 4.  客服收到一個新的聊天室
* 5.  客服檢視此聊天室
* 6.  客戶輸入訊息
* 7.  客服收到客戶的訊息
* 8.  客服回覆訊息給客戶
* 9.  客戶收到訊息
*
* */

server.listen(8002);
app.use('/static', express.static(__dirname + '/node_modules/socket.io-client'));
app.use(express.static(__dirname + '/static'));

app.get('/users', function(request, response) {
   response.send(users);
    users.forEach(function(element){
       element.socket.emit('message', {"messages": ['wefewfewfewfewf']});
    });
});

io.sockets.on('connection', handleConnection);

function handleConnection(socket) {
    console.log('connected.', socket.id);
    console.log('users:', users);
    socket.on('send', handleSend);
    socket.on('join', handleJoin);
    socket.on('disconnect', handleDisconnect);

    function handleSend(data) {
        var user = getUser(socket.id);
    	messages.push(user.name + ": " + data.message);
        sendMessages();
    }

    function handleJoin(data) {
    	var user = {
	        id: socket.id,
	        name: data.user
    	};
	    users.push(user);
    	messages.push(user.name + " joined.");
    	sendMessages();
    }

    function handleDisconnect() {
        var user = getUser(socket.id);
    	messages.push(user.name + " exit.");
    	sendMessages();
        removeUser(socket.id);
    }

    function sendMessages() {
        console.log(messages);
        io.sockets.emit('message', {
            messages: messages
        });
    }
}

function removeUser(id) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users.splice(i, 1);
            return;
        }
    }
}

function getUser(id) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
        	return users[i];
        }
    }
}