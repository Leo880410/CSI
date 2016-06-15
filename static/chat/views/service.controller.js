(function () {
    angular.module('chat').controller('ServiceCtrl', ServiceCtrl);

    ServiceCtrl.$inject = [];
    function ServiceCtrl() {
        var vm = this;

        activate();

        function activate() {
            console.log('ServiceCtrl loaded.');
        }
    }
})();
