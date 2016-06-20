var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var users = [];
//var messages = [];

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

app.get('/users', function (request, response) {
    response.send(users);
    users.forEach(function (element) {
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

    function handleJoin(data) {
        var flag = false; //id是否重複
        for(var i = 0 ; i < users.length;i++){
            if(users[i].id == socket.id)flag = true;
        }
        if(flag == false) {
            var user = createUser(socket.id, data.user);
            console.log('socket.id:' + socket.id);
            users.push(user);
            sendMessages();
        }
    }

    function handleSend(data) {
        var user = getUser(socket.id);
        for(var i = 0; i<users.length;i++) {
            if(users[i].id == user.id){
                users[i].state = data.message;
            }
        }
        sendMessages();
    }

    function handleDisconnect() {
        removeUser(socket.id);
        sendMessages();
    }

    function sendMessages() {
        console.log(users);
        io.sockets.emit('message', {
            user: users,
        });
    }
}

function createUser(id, name) {
    return {
        id: id,
        name: name,
        timestamp: new Date(),
        state: 'normal',
        longitude: getRandomInRange(-180, 180, 5),
        latitude: getRandomInRange(-180, 180, 5)
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
function getRandomInRange(from, to, fixed) {
    var s = (Math.random() * (to - from) + from).toFixed(fixed);
    return s;
}
