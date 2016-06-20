(function () {
    angular.module('chat').controller('ServiceCtrl', ServiceCtrl);

    ServiceCtrl.$inject = [];
    function ServiceCtrl() {
        var vm = this;

        activate();
        function activate() {
            var socket = null;
            socket = io.connect('54.148.46.112:8002');
            console.log('ServiceCtrl loaded.');
            var table = document.getElementById("myTable");
            socket.on('message', function (data) {
                messages.innerHTML = "";
                //var table = document.getElementById("myTable");
                while(table.rows.length > 1) {
                    table.deleteRow(1);
                }
                data.user.forEach(function (element, index) {
                    var color = '#00ff7f';
                    if( element.state != "normal")color='#ff0000';
                    //messages.innerHTML += " User : " + element.name + ", state = " + "<font style=" + '"' + "background-color: " + color+'">' + element.state + "</font><br>";



                    var row = table.insertRow(1);
                    var cell0 = row.insertCell(0);
                    var cell1 = row.insertCell(1);
                    var cell2 = row.insertCell(2);
                    var cell3 = row.insertCell(3);
                    cell0.innerHTML = element.name;
                    cell1.innerHTML = element.longitude;
                    cell2.innerHTML = element.latitude;
                    cell3.innerHTML = element.state;
                    cell3.style.backgroundColor = color;
                    row.title =  tableText(element);
                    row.onclick = function () {
                        alert(tableText(element));
                    };
                });
                console.log(data);
            });

            function tableText(e) {
                var s;
                if(e.state == "normal")
                    s = "Name : " + e.name + "\n狀態 : " + e.state + "\n心跳 : 82/m" +
                        "\n血壓 : 115/m" + "\n所在地 : 經度" + e.longitude + " / 緯度" + e.latitude;
                else{
                    s = "Name : " + e.name + "\n狀態 : " + e.state + "\n心跳 : 50/m" +
                        "\n血壓 : 150/m" + "\n所在地 : 經度" + e.longitude + " / 緯度" + e.latitude +
                        "\n是否已通知醫院 : Y" + "\n事件狀態 : 前往救援中";
                }
                return s;
            }


        }
    }
})();
