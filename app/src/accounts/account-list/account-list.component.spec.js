describe('AccountCtrl', function () {
    beforeEach(module('selfService'));

    var $controller;
    var $state;
    var AccountCtrl;
    var AccountService;
    var vm;

    beforeEach(inject(function (_$controller_, _AccountService_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        AccountService = _AccountService_;
        $state = {
            go: jasmine.createSpy()
        };

        AccountCtrl = $controller('AccountCtrl', {
            $state: $state
        });

        vm = AccountCtrl;

    }));

    describe('vm.routeTo', function() {
        it('should modify state appropriately for loan account', function () {
            // Routing to loan with account 123
            vm.routeTo('loan',123);
            expect($state.go).toHaveBeenCalledWith('app.viewloanaccount', {id: 123});
        });

        it('should modify state appropriately for savings account', function () {
            // Routing to loan with account 123
            vm.routeTo('savings',312);
            expect($state.go).toHaveBeenCalledWith('app.viewsavingsaccount', {id: 312});
        });
    });

    describe('vm.clientId', function() {
        it('should call init, getClient and AccountService functions', function () {
            // Spying On Functions
            spyOn(AccountCtrl, 'init').and.callThrough();
            spyOn(AccountCtrl, 'getClient').and.callThrough();
            spyOn(AccountService,'getClientId').and.callThrough();

            // Should be undefined in starting
            expect(vm.clientId).toBeNull();

            // Initialize the Controller
            vm.init();

            expect(vm.init).toHaveBeenCalled();
            expect(vm.getClient).toHaveBeenCalled();
            expect(AccountService.getClientId).toHaveBeenCalled();
        })
    });
});