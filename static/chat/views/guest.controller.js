(function () {
    angular.module('chat').controller('GuestCtrl', GuestCtrl);

    GuestCtrl.$inject = [];
    function GuestCtrl() {
        var vm = this;

        activate();

        function activate() {
            console.log('GuestCtrl loaded.');
        }
    }
})();
