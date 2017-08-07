(function () {
    'use strict';

    angular.module('selfService')
        .controller('ConfirmAccountCtrl', ['$scope', '$state', '$mdToast', 'AuthService', ConfirmAccountCtrl]);

    /**
     * @module ConfirmAccountCtrl
     * @description
     * Handles Confirmation Token
     */
    function ConfirmAccountCtrl($scope, $state, $mdToast, AuthService) {
        var vm = this;

        vm.verifyRegister = verifyRegister;

        function verifyRegister() {
            AuthService.verifyRegister().save(vm.form).$promise
                .then(function() {
                    $state.go('login')
                })
        }
    }

})();
