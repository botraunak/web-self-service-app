(function () {
    'use strict';

    angular.module('selfService')

        .constant("BASE_URL", "https://mobile.openmf.org/fineract-provider/api/v1")

        .constant("TENANT_IDENTIFIER", "mobile")

        .constant('AUTH_EVENTS', {
            updateUser: 'update-user',
            notAuthorized: 'auth-not-authorized',
            notAuthenticated: 'auth-not-authenticated'
        })

        .constant('USER_ROLES', {
            user: 'USER'
        });

})();