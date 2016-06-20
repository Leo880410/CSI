(function () {
    angular.module('chat').controller('GuestCtrl', GuestCtrl);

    GuestCtrl.$inject = [];
    function GuestCtrl() {
        var vm = this;
        var flagM = true;
        activate();

        function activate() {
            console.log('GuestCtrl loaded.');
            var socket = null;
            socket = io.connect('54.148.46.112:8002');
            console.log("hi");
            join.onclick = function () {
                socket.emit('join', {user: username.value});
                flagM = true;
                username.disabled = true;
                join.disabled = true;
                send.innerHTML = "HELP!";

                console.log('user:' + username.value);
                send.onclick = function () {
                    if(flagM){
                        socket.emit('send', {message: "HELP!"});
                        send.innerHTML = "Fine!";
                        flagM = !flagM;
                    }else{
                        socket.emit('send', {message: "normal"});
                        send.innerHTML = "HELP!";
                        flagM = !flagM;
                    }
                }

            }
        }
    }
})();
