(function(){
    'use strict';

    angular.module('selfService')
        .controller('ReviewTransferDialogCtrl', ['$scope', '$rootScope', '$stateParams', '$filter', '$mdDialog', '$mdToast', 'transferFormData', 'AccountTransferService', ReviewTransferDialogCtrl]);

    function ReviewTransferDialogCtrl($scope, $rootScope, $stateParams, $filter, $mdDialog, $mdToast, transferFormData, AccountTransferService) {

        var vm = this;
        vm.transferFormData = Object.assign({}, transferFormData);
        vm.cancel = cancel;
        vm.transfer = transfer;

        vm.transferFormData.transferDate = $filter('DateFormat')(transferFormData.transferDate);

        function cancel() {
            $mdDialog.cancel();
        }

        function transfer() {
            // Transforming Request Data
            var transferData = {
                fromOfficeId: vm.transferFormData.fromAccount.officeId,
                fromClientId: vm.transferFormData.fromAccount.clientId,
                fromAccountType: vm.transferFormData.fromAccount.accountType.id,
                fromAccountId: vm.transferFormData.fromAccount.accountId,
                toOfficeId: vm.transferFormData.toAccount.officeId,
                toClientId: vm.transferFormData.toAccount.clientId,
                toAccountType: vm.transferFormData.toAccount.accountType.id,
                toAccountId: vm.transferFormData.toAccount.accountId,
                dateFormat: "dd MMMM yyyy",
                locale: "en",
                transferDate: vm.transferFormData.transferDate,
                transferAmount: "" + vm.transferFormData.amount,
                transferDescription: vm.transferFormData.remark
            }
            // Sending
            AccountTransferService.transfer().save(transferData).$promise.then(function () {
               $mdDialog.hide("success");
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Transfer Completed Successfully')
                        .position('top right')
                );
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Completing Transfer: ' + errors)
                        .position('top right')
                );
                $mdDialog.hide("error");

            });

        }
    }
})();
(function () {
    'use strict';

    angular.module('selfService')
        .directive('translateHelper', translateHelper);

    function translateHelper() {
        var directive = {
            restrict: 'E',
            controller: 'translateHelperCtrl',
            controllerAs: 'vm',
            templateUrl: 'src/common/translate-helper/translate-helper.html'
        }

        return directive;
    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('translateHelperCtrl', ['$scope', '$rootScope', '$translate', translateHelperCtrl]);

    function translateHelperCtrl($scope, $rootScope, $translate) {
        var vm = this;
        vm.langCode = getLangCode();
        vm.updateLang = updateLang;

        function getLangCode() {
            return $translate.use();
        }

        function updateLang() {
            $translate.use(vm.langCode);
        }
    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesAddCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$mdToast', 'BeneficiariesService', BeneficiariesAddCtrl]);

    function BeneficiariesAddCtrl($scope, $rootScope, $state, $stateParams, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.addBeneficiaryFormData = {
            "locale": "en_GB"
        };
        vm.accountTypeOptions = [];
        vm.getBeneficiaryTemplate = getBeneficiaryTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        function getBeneficiaryTemplate() {
            BeneficiariesService.addBeneficiariesTemplate().get().$promise.then(function (data) {
                vm.accountTypeOptions = data.accountTypeOptions;
            })
        }

        function clearForm() {
            $scope.addBeneficiaryForm.$setPristine();
            vm.addBeneficiaryFormData = {
                "locale": "en_GB"
            };
        }

        function submit() {
            BeneficiariesService.beneficiary().save(vm.addBeneficiaryFormData).$promise.then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Beneficiary Added Successfully')
                        .position('top right')
                );
                vm.clearForm();
            }, function (resp) {
                var errors = '';
                if(resp.data){
                    errors = resp.data.errors.map(function (data) {
                        return data.defaultUserMessage;
                    });
                    errors.join(' ');
                }
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Adding Beneficiary: ' + errors)
                        .position('top right')
                );

            });
        }
    }
})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesListCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$mdDialog', '$mdToast', 'BeneficiariesService', BeneficiariesListCtrl]);

    function BeneficiariesListCtrl($scope, $rootScope, $state, $stateParams, $mdDialog, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.loadingBeneficiaries = true;
        vm.beneficiaries = [];
        vm.beneficiariesFilter = "";
        vm.page = 1;
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getBeneficiaries = getBeneficiaries();
        vm.addBeneficiary = addBeneficiary;
        vm.deleteConfirm = deleteConfirm;

        function getBeneficiaries() {
            BeneficiariesService.getBeneficiaries().query().$promise.then(function(data) {
                vm.beneficiaries = data;
                vm.loadingBeneficiaries = false;
            });
        }

        function addBeneficiary() {
            $state.go('app.addbeneficiary');
        }

        function deleteConfirm(ev, beneficiary) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete?')
                .textContent('This beneficiary will be removed from your account')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Delete!')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
               BeneficiariesService.beneficiary().delete({
                   id: beneficiary.id
               }, function() {
                   $mdToast.show(
                       $mdToast.simple()
                           .textContent('Beneficiary Deleted Successfully')
                           .position('top right')
                   );
                   vm.beneficiaries = vm.beneficiaries.filter(function (benef) {
                       return benef.id !== beneficiary.id
                   });
               });
            }, function() {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error in Deleting Beneficiary')
                        .position('top right')
                );
            });
        }
    }
})();
(function () {
    'use strict';
    angular.module('selfService')
        .service('AccountTransferService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', AccountTransferService]);

    function AccountTransferService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getTransferTemplate = function () {
            return $resource(BASE_URL + '/self/accounttransfers/template');
        }

        this.transfer = function () {
            return $resource(BASE_URL + '/self/accounttransfers');
        }

    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountTransferCtrl', ['$scope', '$rootScope', '$stateParams', '$filter', '$mdDialog', '$mdDateLocale', '$mdToast', 'AccountService', 'AccountTransferService', AccountTransferCtrl]);

    function AccountTransferCtrl($scope, $rootScope, $stateParams, $filter, $mdDialog, $mdDateLocale, $mdToast, AccountService, AccountTransferService) {

        var vm = this;
        vm.fromAccountOptions = [];
        vm.toAccountOptions = [];
        vm.transferFormData = getTransferFormDataObj()

        vm.getTransferTemplate = getTransferTemplate();
        vm.submit = submit;

        // FORMAT THE DATE FOR THE DATEPICKER
        $mdDateLocale.formatDate = function (date) {
            return $filter('date')(date, "dd-MM-yyyy");
        };

        function getTransferFormDataObj() {
            return {
                transferDate: new Date()
            };
        }

        function getTransferTemplate() {
            AccountTransferService.getTransferTemplate().get(function (data) {
                vm.fromAccountOptions = data.fromAccountOptions;
                vm.toAccountOptions = data.toAccountOptions;
            });
        }

        function clearForm() {
            $scope.transferForm.$setPristine();
            vm.transferFormData = getTransferFormDataObj();
        }

        function submit(ev) {
            $mdDialog.show({
                controller: 'ReviewTransferDialogCtrl',
                controllerAs: 'vm',
                templateUrl: 'src/transfers/review-transfer-dialog/review-transfer-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {transferFormData: vm.transferFormData},
                clickOutsideToClose: true
            }).then(function (result) {
                if(result === "success"){
                    clearForm();
                }
            }, function () {
                clearForm();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Transfer Cancelled')
                        .position('top right')
                );
            });
        }


    }
})();
(function () {
    'use strict';
    angular.module('selfService')
        .service('TransactionService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', TransactionService]);

    function TransactionService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getClientTransactions = function (clientId) {
            return $resource(BASE_URL + '/self/clients/' + clientId + '/transactions')
        }

    }

})();

(function(){
    'use strict';

    angular.module('selfService')
        .controller('RecentTransactionCtrl', ['$scope', '$rootScope', '$stateParams', 'AccountService', 'TransactionService', RecentTransactionCtrl]);

    function RecentTransactionCtrl($scope, $rootScope, $stateParams, AccountService, TransactionService) {

        var vm = this;
        vm.loadingTransactions 	= true;
        vm.recenttransactions = {};
        vm.onPaginate = onPaginate;
        vm.page = 1;
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getTransactions = getTransactions(vm.query);

        function getTransactions(query){
            AccountService.getClientId().then(function (clientId){
                TransactionService.getClientTransactions(clientId).get(query).$promise.then(function (res) {
                    vm.loadingTransactions = false;
                    vm.recenttransactions = res;
                });
            });
        }

        function onPaginate(offset,limit) {
            getTransactions(angular.extend({}, vm.query, {offset: (offset - 1) * limit, limit: limit}));
        }

    }
})();


(function(){
	'use strict';

		angular.module('selfService')
			.controller('LoanAccountViewCtrl', ['$scope', '$http','BASE_URL', '$rootScope', '$stateParams', 'AccountService', LoanAccountViewCtrl]);

		function LoanAccountViewCtrl($scope,$http,BASE_URL, $rootScope, $stateParams, AccountService) {

			var vm = this;
			vm.loadingLoanAccountInfo 	= true;
			vm.loanAccountDetails 		= getLoanDetails( $stateParams.loanId );	

			function getLoanDetails( id ) {
				AccountService.getLoanAccount(id).get().$promise.then(function(res) {
					vm.loadingLoanAccountInfo = false;
					vm.loanAccountDetails = res;
				});
			}
		}
})();
(function(){
  'use strict';

  angular.module('selfService')
    .service('storageService', ['$q', storageService]);

  function storageService($q){

    return {
        getItem: function (key) {
            return $q.when(window.localStorage.getItem(key));
        },
        setItem: function (key, value) {
            window.localStorage.setItem(key, value);
        },
        getObject: function (key) {
            return $q.when(JSON.parse(window.localStorage.getItem(key)));
        },
        setObject: function (key, value) {
            value = JSON.stringify(value);
            window.localStorage.setItem(key, value);
        },
        clear: function () {
            window.localStorage.clear();
        }
    };
  }

})();
(function(){
  'use strict';

  angular.module('selfService')
    .service('navService', ['$q', navService]);

  function navService($q){
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'view_module',
        sref: '.dashboard'
      },
      {
        name: 'Accounts',
        icon: 'account_balance_wallet',
        sref: '.clients'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
(function () {
    'use strict';

    angular.module('selfService')
        .filter('DateFormat', function (dateFilter) {
            return function (input) {
                if (input) {
                    var tDate = new Date(input);
                    return dateFilter(tDate, 'dd MMMM yyyy');//@todo Add this format to localstorage
                }
                return '';
            };
        })
        .filter('StatusLookup', function () {
            return function (input) {
                var cssClassNameLookup = {
                    "true": "statusactive",
                    "false": "statusdeleted",
                    "Active": "statusactive",
                    "loanStatusType.submitted.and.pending.approval": "statuspending",
                    "loanStatusType.approved": "statusApproved",
                    "loanStatusType.active": "statusactive",
                    "loanStatusType.overpaid": "statusoverpaid",
                    "savingsAccountStatusType.submitted.and.pending.approval": "statuspending",
                    "savingsAccountStatusType.approved": "statusApproved",
                    "savingsAccountStatusType.active": "statusactive",
                    "savingsAccountStatusType.activeInactive": "statusactiveoverdue",
                    "savingsAccountStatusType.activeDormant": "statusactiveoverdue",
                    "savingsAccountStatusType.matured": "statusmatured",
                    "loanProduct.active": "statusactive",
                    "clientStatusType.pending": "statuspending",
                    "clientStatusType.closed":"statusclosed",
                    "clientStatusType.rejected":"statusrejected",
                    "clientStatusType.withdraw":"statuswithdraw",
                    "clientStatusType.active": "statusactive",
                    "clientStatusType.submitted.and.pending.approval": "statuspending",
                    "clientStatusTYpe.approved": "statusApproved",
                    "clientStatusType.transfer.in.progress": "statustransferprogress",
                    "clientStatusType.transfer.on.hold": "statustransferonhold",
                    "groupingStatusType.active": "statusactive",
                    "groupingStatusType.pending": "statuspending",
                    "groupingStatusType.submitted.and.pending.approval": "statuspending",
                    "groupingStatusType.approved": "statusApproved",
                    "shareAccountStatusType.submitted.and.pending.approval": "statuspending",
                    "shareAccountStatusType.approved": "statusApproved",
                    "shareAccountStatusType.active": "statusactive",
                    "shareAccountStatusType.rejected": "statusrejected",
                    "purchasedSharesStatusType.applied": "statuspending",
                    "purchasedSharesStatusType.approved": "statusApproved",
                    "purchasedSharesStatusType.rejected": "statusrejected"
                }

                return cssClassNameLookup[input];
            }
        })

})();		


(function(){

  angular.module('selfService')
    .controller('MainCtrl', ['navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$state', '$mdToast', '$scope','AuthService', MainCtrl]);

  function MainCtrl(navService, $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast, $scope, AuthService) {
    var vm = this;

    vm.menuItems = [ ];
    vm.selectItem = selectItem;
    vm.toggleItemsList = toggleItemsList;
    vm.showActions = showActions;
    vm.title = $state.current.data.title;
    vm.showSimpleToast = showSimpleToast;
    vm.toggleRightSidebar = toggleRightSidebar;

    vm.userDetails = AuthService.getUser();


    navService.loadAllItems().then(function(menuItems) {
        vm.menuItems = [].concat(menuItems);
    });

    function toggleRightSidebar() {
      $mdSidenav('right').toggle();
    }

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    function selectItem (itemName) {
      vm.title = itemName;
      vm.toggleItemsList();
    }

    function showActions($event) {
      $mdBottomSheet.show({
        parent: angular.element(document.getElementById('content')),
        templateUrl: 'app/views/partials/bottomSheet.html',
        controller: [ '$mdBottomSheet', SheetController],
        controllerAs: "vm",
        bindToController : true,
        targetEvent: $event
      }).then(function(clickedItem) {
        clickedItem && $log.debug( clickedItem.name + ' clicked!');
      });

      function SheetController( $mdBottomSheet ) {
        var vm = this;

        vm.actions = [
          { name: 'Share', icon: 'share', url: 'https://twitter.com/intent/tweet?text=Angular%20Material%20Dashboard%20https://github.com/flatlogic/angular-material-dashboard%20via%20@flatlogicinc' },
          { name: 'Star', icon: 'star', url: 'https://github.com/flatlogic/angular-material-dashboard/stargazers' }
        ];

        vm.performAction = function(action) {
          $mdBottomSheet.hide(action);
        };
      }
    }

    function showSimpleToast(title) {
      $mdToast.show(
        $mdToast.simple()
          .content(title)
          .hideDelay(2000)
          .position('bottom right')
      );
    }

    $scope.logout = function() {
      AuthService.logout();
    }

  }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('ClientViewCtr', ['$scope', '$http', 'BASE_URL', '$rootScope', '$stateParams', 'ClientService', ClientViewCtr]);

    function ClientViewCtr($scope, $http, BASE_URL, $rootScope, $stateParams, ClientService) {

        var vm = this;
        vm.loadingAccountInfo = true;

        getClient($stateParams.clientId);
        getClientCharges($stateParams.clientId);
        getClientAccounts($stateParams.clientId);

        function getClient(id) {
            ClientService.getClient(id).get().$promise.then(function (res) {
                vm.client = res;
            });
            $http({
                method: 'GET',
                url: BASE_URL + '/self/clients/' + id + '/images?maxHeight=150'
            }).then(function (imageData) {
                vm.client.imageURL = imageData.data;
            });
        }

        function getClientCharges(id) {
            ClientService.getClientCharges(id).get().$promise.then(function (res) {
                vm.charges = res.pageItems;
            });
        }

        function getClientAccounts(id) {
            ClientService.getClientAccounts(id).get().$promise.then(function (res) {
                vm.loanAccounts = res.loanAccounts;
                vm.savingsAccounts = res.savingsAccounts;
                vm.loadingAccountInfo = false;
            });
        }
    }
})();
(function () {
    'use strict';

    angular.module('selfService')
        .service('ClientService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', ClientService]);

    function ClientService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getAllClients = function (data) {
            return $resource(BASE_URL + '/self/clients', data);
        };

        this.getClient = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id);
        }

        this.getClientImage = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/images');
        }

        this.getClientCharges = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/charges?pendingPayment=true');
        }

        this.getClientAccounts = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/accounts');
        }

    }

})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('ClientCtrl', ['$scope', '$rootScope', '$location', 'ClientService', ClientCtrl]);

    function ClientCtrl($scope, $rootScope, $location, ClientService) {

        var vm = this;
        vm.selected = [];
        vm.getClients = getClients;
        vm.onPaginate = onPaginate;
        vm.onReorder = onReorder;
        vm.routeTo = routeTo;
        vm.loadingClientInfo = true;

        vm.query = {
            orderBy: 'displayName',
            limit: 5,
            offset: 0
        };

        getClients(vm.query);

        function getClients(query) {
            ClientService.getAllClients().get(query).$promise.then(function (res) {
                vm.clients = res;
                vm.loadingClientInfo = false;
            });
        }

        function onPaginate(offset, limit) {
            getClients(angular.extend({}, vm.query, {offset: offset, limit: limit}));
        }

        function onReorder(order) {
            getClients(angular.extend({}, vm.query, {order: order}));
        }

        function routeTo(id) {
            $location.path('/app/viewclient/' + id);
        }


    }

})();
(function () {
    'use strict';
    angular.module('selfService')
        .service('ChargesService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', ChargesService]);

    function ChargesService($q, $http, $rootScope, $resource, BASE_URL) {

        this.getClientCharges = function (clientId) {
            return $resource(BASE_URL + '/self/clients/' + clientId + '/charges')
        }

    }

})();

(function(){
    'use strict';

    angular.module('selfService')
        .controller('ChargesCtrl', ['$scope', '$rootScope', '$stateParams', 'AccountService', 'ChargesService', ChargesCtrl]);

    function ChargesCtrl($scope, $rootScope, $stateParams, AccountService, ChargesService) {

        var vm = this;
        vm.loadingCharges = true;
        vm.charges = {};
        vm.onPaginate = onPaginate;
        vm.page = 1;
        vm.query = {
            limit: 5,
            offset: 0
        }

        vm.getCharges = getCharges(vm.query);

        function getCharges(query){
            AccountService.getClientId().then(function (clientId){
                ChargesService.getClientCharges(clientId).get(query).$promise.then(function (res) {
                    vm.loadingCharges = false;
                    vm.charges = res;
                });
            });
        }

        function onPaginate(offset,limit) {
            getCharges(angular.extend({}, vm.query, {offset: (offset - 1) * limit, limit: limit}));
        }

    }
})();
(function() {
    'use strict';

    angular.module('selfService')
        .service('BeneficiariesService', ['$q', '$http', '$rootScope', '$state', '$resource', 'BASE_URL', BeneficiariesService]);

    function BeneficiariesService($q, $http, $rootScope, $state, $resource, BASE_URL) {

        this.getBeneficiaries = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt');
        };

        this.addBeneficiariesTemplate = function() {
            return $resource(BASE_URL + '/self/beneficiaries/tpt/template');
        }

        this.beneficiary = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt/:id');
        }
    }

})();
(function(){
  'use strict';

    angular.module('selfService')
        .service('AuthService', ['$q', '$http', '$rootScope', '$state', '$resource', 'storageService', 'BASE_URL', 'USER_ROLES', AuthService]);

    function AuthService($q, $http, $rootScope, $state, $resource, storageService, BASE_URL, USER_ROLES) {

        var role            = '',
            userData        = '',       
            isAuthenticated = false;

        // Set Access Token to requests
        var setAccessToken = function (token) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
        }

        storageService.getObject("user_profile").then(function (data) {
            if (data) {
                isAuthenticated = true;
                role = USER_ROLES.user;
                userData = data;
                setAccessToken(userData.base64EncodedAuthenticationKey);
            }
        })

        this.setUser = function (res) {
            storageService.setObject('user_profile', res);
            isAuthenticated = true;
            userData = res;
            role = USER_ROLES.user;
            setAccessToken(res.base64EncodedAuthenticationKey);
        }

        this.getUser = function() {
            return userData;
        }

        this.isAuthenticated = function () {
            return isAuthenticated;
        };

        this.role = function () {
            return role;
        }

        this.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (this.isAuthenticated() && authorizedRoles.indexOf(role) !== -1);
        }

        //Resource for REST APIs
        this.doLogin = function(data) {
            return $resource(BASE_URL+'/self/authentication', data);
        }

        this.logout = function() {
            role = '';
            userData = '';
            isAuthenticated = false;
            setAccessToken('');
            storageService.clear();
            $state.go('login');
        }

    }

})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$mdToast', 'AUTH_EVENTS', 'AuthService', 'AccountService', LoginCtrl]);

    function LoginCtrl($scope, $rootScope, $state, $mdToast, AUTH_EVENTS, AuthService, AccountService) {

        $scope.doLogin = function () {
            AuthService.doLogin($scope.loginData).save().$promise.then(function (result) {
                AuthService.setUser(result);
                AccountService.getClients().get().$promise
                    .then(function (res) {
                        if (res.pageItems.length !== 0) {
                            AccountService.setClientId(res.pageItems[0].id);
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Successful Login")
                                    .hideDelay(2000)
                                    .position('top right')
                            );
                            $state.go("app.accounts");
                        } else {
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("No Clients Found")
                                    .hideDelay(2000)
                                    .position('top right')
                            );
                            AuthService.logout();
                        }
                    })
                    .catch(function () {
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Not a Self Service User")
                                .hideDelay(2000)
                                .position('top right')
                        );
                        AuthService.logout();
                    })
            });
        }

    }

})();

(function () {
    'use strict';
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('AccountService', ['$q', '$http', '$rootScope', '$resource', 'BASE_URL', 'storageService', AccountService]);

    function AccountService($q, $http, $rootScope, $resource, BASE_URL, storageService) {

        /**
         * Get the clients associated with the current user's account.
         *
         */
        this.getClients = function () {
            return $resource(BASE_URL + '/self/clients/');
        };

        this.getAllAccounts = function (clientId) {//@todo rename this getClientAccounts
            //@todo update this to return $resource(BASE_URL+'/self/clients/'+id+'/accounts'); and test
            return $resource(BASE_URL + '/self/clients/' + clientId + '/accounts');
        };

        this.getClient = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id);
        }

        this.getClientImage = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/images');
        }

        this.getClientCharges = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/charges?pendingPayment=true');
        }

        this.getClientAccounts = function (id) {
            return $resource(BASE_URL + '/self/clients/' + id + '/accounts');
        }

        this.getLoanAccount = function (id) {
            return $resource(BASE_URL + '/self/loans/' + id);
        }

        this.setClientId = function (id) {
            storageService.setObject('client_id', id);
        }

        this.getClientId = function () {
            return storageService.getItem('client_id');
        }

    }

})();


(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountCtrl', ['$scope', '$rootScope', '$location', 'AccountService', 'AuthService', AccountCtrl]);

    function AccountCtrl($scope, $rootScope, $location, AccountService, AuthService) {

        var vm = this;
        vm.selected = [];
        vm.getAccounts = getAccounts;
        vm.onPaginate = onPaginate;
        vm.onReorder = onReorder;
        vm.routeTo = routeTo;
        vm.userData = AuthService.getUser();
        vm.clientId = getClient();//@todo check if this is behind the 2 calls
        vm.accounts = [];
        vm.loanAccounts = [];
        vm.savingsAccounts = [];
        vm.shareAccounts = [];
        vm.loadingAccountInfo = true;

        vm.query = {
            limit: 5,
            offset: 1
        };

        function getClient() {
            AccountService.getClientId().then(function (clientId) {
                vm.clientId = clientId;
                getAccounts(clientId);
            });
        }

        function getAccounts(accountNo) {
            AccountService.getAllAccounts(accountNo).get().$promise.then(function (res) {
                vm.loanAccounts = res.loanAccounts;
                vm.savingsAccounts = res.savingsAccounts;
                vm.shareAccounts = res.shareAccounts;
                vm.loadingAccountInfo = false;
            });
        }

        function onPaginate(offset, limit) {
            getAccounts(angular.extend({}, vm.query, {offset: offset, limit: limit}));
        }

        function onReorder(order) {
            getAccounts(angular.extend({}, vm.query, {order: order}));
        }

        function routeTo(accountType, id) {
            var routingSlug = 'viewloanaccount';
            if ('savings' == accountType) {
                routingSlug = 'viewsavingsaccount';
            } else if ('loan' == accountType) {
                routingSlug = 'viewloanaccount';
            } else {
                routingSlug = 'viewshareaccount';
            }
            $location.path('/app/' + routingSlug + '/' + id);
        }

    }

})();
