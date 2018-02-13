angular.module("myApp")
    .controller('AppCtrl', function ($scope, $http, $state, $rootScope, CartDetailsHttp) {
        $scope.showLoginBtn = true;
        $scope.incorrect = false;
        $scope.showSignUpBtn = true;
        $scope.username = "";
        $scope.contact = {};
        $rootScope.cartCount = 0;

        getLoginDetails();
        getCartCount();

        $scope.showSignUpModal = function () {
            $('#signUpModal').modal('show');
        }

        $scope.showLoginModal = function () {
            $('#LoginModal').modal('show');
        }

        $scope.signUp = function () {
            if ($scope.contact.username != null && $scope.contact.password != null &&
                $scope.contact.confirmPassword != null &&
                $scope.contact.password == $scope.contact.confirmPassword) {
                // API Call
                $http.post('/signUp', $scope.contact).then(function (response) { // Signup Success
                    $scope.showSignUpBtn = false;
                    $scope.showLoginBtn = false;
                    $('#signUpModal').modal('hide');
                    $scope.username = response.data.emailId;
                    $scope.contact = {};
                });
            } else {
            }
        };

        $scope.login = function () {
            // API Call
            $http.post('/login', $scope.contact).then(function (response) {
                if (response.data == null) { // Login Failed                
                    $scope.incorrect = true;
                    $rootScope.logSucess = false;
                } else { // Login Success      
                    $sessionStorage.username = response.data.emailId;
                    $scope.incorrect = false;
                    $scope.showLoginBtn = false;
                    $scope.showSignUpBtn = false;
                    $rootScope.logSucess = true;
                    $scope.username = response.data.emailId;
                    sessionStorage.setItem("loginDetails", $scope.username);
                    $('#LoginModal').modal('hide');
                    $scope.contact = {};
                }
            });
        }

        $scope.logout = function () {
            $scope.showLoginBtn = true;
            $scope.showSignUpBtn = true;
            sessionStorage.removeItem("loginDetails");
            $scope.username = "";
        }

        $scope.goToCart = function() {
            $state.go('cart');
        }

        function getLoginDetails() {
            $scope.username = sessionStorage.getItem("loginDetails");
        }

        function getCartCount() {            
            CartDetailsHttp.getCartDetails().then(function(response) {
                $rootScope.cartCount = response.data.length;
            });
        }
    });