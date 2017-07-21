(function () {
    'use strict';

    angular.module('selfService')
        .directive('translateHelper', translateHelper);

    function translateHelper() {
        var directive = {
            restrict: 'E',
            controller: 'translateHelperCtrl',
            controllerAs: 'vm',
            templateUrl: 'src/common/directives/translate-helper/translate-helper.html'
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
(function(){
    'use strict';

    angular.module('selfService')
        .controller('ReviewTransferDialogCtrl', ['$filter', '$mdDialog', '$mdToast', 'transferFormData', 'AccountTransferService', ReviewTransferDialogCtrl]);

    function ReviewTransferDialogCtrl($filter, $mdDialog, $mdToast, transferFormData, AccountTransferService) {

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
(function(){
    'use strict';

    angular.module('selfService')
        .controller('ReviewTPTDialogCtrl', ['$filter', '$mdDialog', '$mdToast', 'transferFormData', 'AccountTransferService', ReviewTPTDialogCtrl]);

    function ReviewTPTDialogCtrl($filter, $mdDialog, $mdToast, transferFormData, AccountTransferService) {

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
            AccountTransferService.transfer().save({type: "tpt"},transferData).$promise.then(function () {
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
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('AccountService', ['$http', '$resource', 'BASE_URL', 'storageService', AccountService]);

    function AccountService($http, $resource, BASE_URL, storageService) {

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
            return $http({
                method: 'GET',
                url: BASE_URL + '/self/clients/' + id + '/images'
            });
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

    angular.module('selfService')
        .controller('MainCtrl', ['navService', '$mdSidenav', 'AuthService', 'AccountService', MainCtrl]);

    function MainCtrl(navService, $mdSidenav, AuthService, AccountService) {
        var vm = this;

        vm.menuItems = [];
        vm.profileImage = null;
        vm.selectItem = selectItem;
        vm.toggleItemsList = toggleItemsList;
        vm.toggleRightSidebar = toggleRightSidebar;
        vm.logout = logout;

        vm.profile = getUserData();

        navService.loadAllItems().then(function (menuItems) {
            vm.menuItems = [].concat(menuItems);
        });

        function toggleRightSidebar() {
            $mdSidenav('right').toggle();
        }

        function toggleItemsList() {
            $mdSidenav('left').toggle();
        }

        function selectItem(itemName) {
            vm.title = itemName;
            vm.toggleItemsList();
        }

        function getUserData() {
            AccountService.getClientId().then(function (clientId) {
                vm.clientId = clientId;
                getClient(clientId);
                getClientImage(clientId);
            });
        }

        function getClient(clientId) {
            AccountService.getClient(clientId).get().$promise.then( function (data) {
                vm.profile = data;
            })
        }

        function getClientImage(clientId) {
            AccountService.getClientImage(clientId).then( function (resp) {
                vm.profileImage = resp.data;
            })
        }

        function logout() {
            AuthService.logout();
        }

    }

})();

(function () {
    'use strict';

    angular.module('selfService')
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
})();
(function () {
    'use strict';

    angular.module('selfService')
        .controller('BeneficiariesEditCtrl', ['$scope', '$stateParams', '$mdToast', 'BeneficiariesService', BeneficiariesEditCtrl]);

    function BeneficiariesEditCtrl($scope, $stateParams, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.editBeneficiaryFormData = {
            "locale": "en_GB"
        };
        vm.beneficiary = $stateParams.data;
        vm.accountTypeOptions = [];
        vm.getBeneficiaryTemplate = getBeneficiaryTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        function getBeneficiaryTemplate() {
            BeneficiariesService.template().get().$promise.then(function (data) {
                vm.accountTypeOptions = data.accountTypeOptions;
            });

            if(vm.beneficiary !== null) {
                vm.editBeneficiaryFormData.accountType = vm.beneficiary.accountType.id;
                vm.editBeneficiaryFormData.accountNumber = vm.beneficiary.accountNumber;
                vm.editBeneficiaryFormData.officeName = vm.beneficiary.officeName;
                vm.editBeneficiaryFormData.transferLimit = vm.beneficiary.transferLimit;
                vm.editBeneficiaryFormData.name = vm.beneficiary.name;
            }
        }

        function clearForm() {
            $scope.editBeneficiaryForm.$setPristine();
            vm.editBeneficiaryFormData = {
                "locale": "en_GB"
            };
        }

        function submit() {
            var data = {
                name: vm.editBeneficiaryFormData.name,
                transferLimit: vm.editBeneficiaryFormData.transferLimit
            }

            BeneficiariesService.beneficiary().update({id: vm.beneficiary.id}, data).$promise.then(function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Beneficiary Updated Successfully')
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
        .controller('BeneficiariesListCtrl', ['$state', '$mdDialog', '$mdToast', 'BeneficiariesService', BeneficiariesListCtrl]);

    function BeneficiariesListCtrl($state, $mdDialog, $mdToast, BeneficiariesService) {

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
        vm.goToEdit = goToEdit;
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

        function goToEdit(beneficiary) {
            $state.go('app.editbeneficiary',{
                id: beneficiary.id,
                data: beneficiary
            });
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
        .controller('BeneficiariesAddCtrl', ['$scope', '$mdToast', 'BeneficiariesService', BeneficiariesAddCtrl]);

    function BeneficiariesAddCtrl($scope, $mdToast, BeneficiariesService) {

        var vm = this;
        vm.addBeneficiaryFormData = {
            "locale": "en_GB"
        };
        vm.accountTypeOptions = [];
        vm.getBeneficiaryTemplate = getBeneficiaryTemplate();
        vm.clearForm = clearForm;
        vm.submit = submit;

        function getBeneficiaryTemplate() {
            BeneficiariesService.template().get().$promise.then(function (data) {
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
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('SavingsAccountService', ['$resource', 'BASE_URL', SavingsAccountService]);

    function SavingsAccountService($resource, BASE_URL) {

        this.savingsAccount = function () {
            return $resource(BASE_URL + '/self/savingsaccounts/:id',{id: '@id'});
        }
    }

})();


(function(){
	'use strict';

		angular.module('selfService')
			.controller('SavingsAccountViewCtrl', ['$stateParams', '$filter', 'SavingsAccountService', SavingsAccountViewCtrl]);

		function SavingsAccountViewCtrl($stateParams, $filter, SavingsAccountService) {

			var vm = this;
			vm.loadingSavingsAccount = true;
			vm.savingsAccountDetails 		= getLoanDetails( $stateParams.id );
			vm.statusClass = '';
			vm.getStatusClass = getStatusClass

			function getLoanDetails( id ) {
                SavingsAccountService.savingsAccount().get({id: id}).$promise.then(function(res) {
					vm.loadingSavingsAccount = false;
					vm.savingsAccountDetails = res;
					getStatusClass();
				});
			}

			function getStatusClass() {
                var statusClass = $filter('StatusLookup')(vm.savingsAccountDetails.status.code);
                statusClass = 'bg_' + statusClass;
                if(vm.savingsAccountDetails.subStatus.id !== 0) {
                    statusClass = $filter('StatusLookup')(vm.savingsAccountDetails.status.code+vm.savingsAccountDetails.subStatus.value);
				}

				vm.statusClass = statusClass;
			}
		}
})();
(function () {
    'use strict';
    //@todo Move this service to the common folder
    angular.module('selfService')
        .service('LoanAccountService', ['$resource', 'BASE_URL', LoanAccountService]);

    function LoanAccountService($resource, BASE_URL) {

        this.loanAccount = function () {
            return $resource(BASE_URL + '/self/loans/:id',{id: '@id'});
        }
    }

})();


(function(){
	'use strict';

		angular.module('selfService')
			.controller('LoanAccountViewCtrl', ['$stateParams', '$filter', 'LoanAccountService', LoanAccountViewCtrl]);

		function LoanAccountViewCtrl($stateParams, $filter, LoanAccountService) {

			var vm = this;
			vm.loadingLoanAccountInfo 	= true;
			vm.loanAccountDetails 		= getLoanDetails( $stateParams.id );
			vm.statusClass = '';
			vm.getStatusClass = getStatusClass

			function getLoanDetails( id ) {
				LoanAccountService.loanAccount().get({id: id}).$promise.then(function(res) {
					vm.loadingLoanAccountInfo = false;
					vm.loanAccountDetails = res;
					getStatusClass();
				});
			}

			function getStatusClass() {
                var statusClass = $filter('StatusLookup')(vm.loanAccountDetails.status.code);
                statusClass = 'bg_' + statusClass;
                if(vm.loanAccountDetails.inArrears) {
                    statusClass += 'overdue';
				}

				vm.statusClass = statusClass;
			}
		}
})();

(function () {
    'use strict';

    angular.module('selfService')
        .controller('AccountCtrl', ['$state', 'AccountService', 'AuthService', AccountCtrl]);

    function AccountCtrl($state, AccountService, AuthService) {

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
            $state.go('app.'+routingSlug, {id: id});
        }

    }

})();

(function () {
    'use strict';
    angular.module('selfService')
        .service('AccountTransferService', ['$resource', 'BASE_URL', AccountTransferService]);

    function AccountTransferService($resource, BASE_URL) {

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
        .controller('AccountTransferCtrl', ['$scope', '$filter', '$mdDialog', '$mdDateLocale', '$mdToast', 'AccountTransferService', AccountTransferCtrl]);

    function AccountTransferCtrl($scope, $filter, $mdDialog, $mdDateLocale, $mdToast, AccountTransferService) {

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
        .service('AccountTransferService', ['$resource', 'BASE_URL', AccountTransferService]);

    function AccountTransferService($resource, BASE_URL) {

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
        .controller('AccountTransferCtrl', ['$scope', '$filter', '$mdDialog', '$mdDateLocale', '$mdToast', 'AccountTransferService', AccountTransferCtrl]);

    function AccountTransferCtrl($scope, $filter, $mdDialog, $mdDateLocale, $mdToast, AccountTransferService) {

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
        .controller('TPTCtrl', ['$scope', '$filter', '$mdDialog', '$mdDateLocale', '$mdToast', 'AccountTransferService', TPTCtrl]);

    function TPTCtrl($scope, $filter, $mdDialog, $mdDateLocale, $mdToast, AccountTransferService) {

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
            AccountTransferService.getTransferTemplate().get({type: "tpt"},function (data) {
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
        .service('TransactionService', ['$resource', 'BASE_URL', TransactionService]);

    function TransactionService($resource, BASE_URL) {

        this.getClientTransactions = function (clientId) {
            return $resource(BASE_URL + '/self/clients/' + clientId + '/transactions')
        }

    }

})();

(function(){
    'use strict';

    angular.module('selfService')
        .controller('RecentTransactionCtrl', ['AccountService', 'TransactionService', RecentTransactionCtrl]);

    function RecentTransactionCtrl(AccountService, TransactionService) {

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
        .controller('DashboardCtrl', ['AccountService', DashboardCtrl]);

    function DashboardCtrl(AccountService) {
        var vm = this;
        vm.dashboardData = {};

        vm.getDashboardData = getDashboardData();

        function getDashboardData() {
            AccountService.getClientId().then(function (clientId) {
                AccountService.getAllAccounts(clientId).get().$promise.then(function(data) {
                    vm.dashboardData.loanAccounts = data.loanAccounts;
                    vm.dashboardData.savingsAccounts = data.savingsAccounts;
                    vm.dashboardData.shareAccounts = data.shareAccounts;
                    vm.dashboardData.totalAccounts = vm.dashboardData.loanAccounts.length + vm.dashboardData.savingsAccounts.length + vm.dashboardData.shareAccounts.length
                    vm.dashboardData.totalSavings = data.savingsAccounts.reduce(getTotalSavings, 0);
                    vm.dashboardData.totalLoan = data.loanAccounts.reduce(getTotalLoan, 0)
                });
            })
        }

        function getTotalSavings(total, acc) {
            if(acc.accountBalance) {
                return total + acc.accountBalance;
            } else {
                return total;
            }
        }

        function getTotalLoan(total, acc) {
            if(acc.loanBalance) {
                return total + acc.loanBalance;
            } else {
                return total;
            }
        }

    }
})();
(function() {
    'use strict';

    angular.module('selfService')
        .service('BeneficiariesService', ['$resource', 'BASE_URL', BeneficiariesService]);

    function BeneficiariesService($resource, BASE_URL) {

        this.getBeneficiaries = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt');
        };

        this.template = function() {
            return $resource(BASE_URL + '/self/beneficiaries/tpt/template');
        }

        this.beneficiary = function () {
            return $resource(BASE_URL + '/self/beneficiaries/tpt/:id',{id: '@id'},{
                update: {
                    method: 'PUT'
                }
            });
        }
    }

})();
(function () {
    'use strict';
    angular.module('selfService')
        .service('ChargesService', ['$resource', 'BASE_URL', ChargesService]);

    function ChargesService($resource, BASE_URL) {

        this.getClientCharges = function (clientId) {
            return $resource(BASE_URL + '/self/clients/' + clientId + '/charges')
        }

    }

})();

(function(){
    'use strict';

    angular.module('selfService')
        .controller('ChargesCtrl', ['AccountService', 'ChargesService', ChargesCtrl]);

    function ChargesCtrl(AccountService, ChargesService) {

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
(function(){
  'use strict';

    angular.module('selfService')
        .service('AuthService', ['$http', '$state', '$resource', 'storageService', 'BASE_URL', 'USER_ROLES', AuthService]);

    function AuthService($http, $state, $resource, storageService, BASE_URL, USER_ROLES) {

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
        .controller('LoginCtrl', ['$scope', '$state', '$mdToast', 'AuthService', 'AccountService', LoginCtrl]);

    function LoginCtrl($scope, $state, $mdToast, AuthService, AccountService) {

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
