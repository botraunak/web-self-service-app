(function () {
    'use strict';

    angular.module('selfService')

        .config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {

            $urlRouterProvider
                .when('','/')
                .otherwise('/404');

            $stateProvider
                .state('app', {
                    abstract: true,
                    templateUrl: 'src/common/main/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm',
                    data: {
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('404', {
                    url: '/404',
                    templateUrl: 'src/common/404.html',
                })
                .state('app.dashboard', {
                    url: '/',
                    templateUrl: 'src/common/dashboard.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm',
                    data: {
                        controller: 'ClientCtrl',
                    controllerAs: 'vm',
                        title: 'Profile',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.accounts', {
                    url: '/accounts',
                    templateUrl: 'src/accounts/account-list/account-list.html',
                    controller: 'AccountCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Accounts',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.viewloanaccount', {
                    url: '/viewloanaccount/:id',
                    templateUrl: 'src/accounts/loan-account-detail/loan-account-detail.html',
                    controller: 'LoanAccountViewCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'View Loan Account',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.viewsavingsaccount', {
                    url: '/viewsavingsaccount/:id',
                    templateUrl: 'src/accounts/savings-account-detail/savings-account-detail.html',
                    controller: 'SavingsAccountViewCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'View Savings Account',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.recenttransactions', {
                    url: '/recenttransactions',
                    templateUrl: 'src/recent-transactions/recent-transactions.html',
                    controller: 'RecentTransactionCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Recent Transactions',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.charges', {
                    url: '/charges',
                    templateUrl: 'src/charges/charges.html',
                    controller: 'ChargesCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Charges',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.aboutus', {
                    url: '/charges',
                    templateUrl: 'src/common/coming-soon.html',
                    controller: 'ClientCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'About Us',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.help', {
                    url: '/charges',
                    templateUrl: 'src/common/coming-soon.html',
                    controller: 'ClientCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Help',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.profile', {
                    url: '/charges',
                    templateUrl: 'src/common/coming-soon.html',
                    controller: 'ClientCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Profile',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.transfers', {
                    url: '/transfers',
                    templateUrl: 'src/transfers/transfers.html',
                    controller: 'AccountTransferCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Transfers',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.tpt', {
                    url: '/tpt',
                    templateUrl: 'src/tpt/tpt.html',
                    controller: 'TPTCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Third Party Transfers',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.beneficiarieslist', {
                    url: '/beneficiaries/list',
                    templateUrl: 'src/beneficiaries/beneficiaries-list/beneficiaries-list.html',
                    controller: 'BeneficiariesListCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Beneficiaries List',
                        authorizedRoles: [USER_ROLES.user]
                    }
                })
                .state('app.addbeneficiary', {
                    url: '/beneficiaries/add',
                    templateUrl: 'src/beneficiaries/beneficiaries-add/beneficiaries-add.html',
                    controller: 'BeneficiariesAddCtrl',
                    controllerAs: 'vm',
                    data: {
                        title: 'Add Beneficiary',
                        authorizedRoles: [USER_ROLES.user]
                    }

                })
                .state('app.editbeneficiary', {
                    url: '/beneficiaries/edit/:id',
                    templateUrl: 'src/beneficiaries/beneficiaries-edit/beneficiaries-edit.html',
                    controller: 'BeneficiariesEditCtrl',
                    controllerAs: 'vm',
                    params: {
                        id: '',
                        data: null
                    },
                    data: {
                        title: 'Edit Beneficiary',
                        authorizedRoles: [USER_ROLES.user]
                    }

                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'src/authentication/authentication.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'login',
                    data: {
                        title: 'Login'
                    }
                })
            }
        )
})();
