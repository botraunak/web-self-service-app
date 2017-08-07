(function () {
    'use strict';

    angular.module('selfService')
        .controller('RegisterCtrl', ['$scope', '$state', '$mdToast', 'AuthService', RegisterCtrl]);

    /**
     * @module RegisterCtrl
     * @description
     * Handles Registration of self service user
     */
    function RegisterCtrl($scope, $state, $mdToast, AuthService) {
        var vm = this;

        /**
         * @name form
         * @description Holds the form Object
         * @type {object}
         */
        vm.form = {};

        vm.registerUser = registerUser;

        function registerUser() {
            AuthService.register(vm.form).then(function() {
                $state.go('confregister');
            }, function (){
                $mdToast.simple()
                    .content("Error Registering User")
                    .hideDelay(2000)
                    .position('top right')
            });
        }
    }

})();
