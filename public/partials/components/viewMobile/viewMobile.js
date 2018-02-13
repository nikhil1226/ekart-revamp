angular.module("myApp")
    .controller('viewMobileCtrl', function ($scope, $rootScope, UtilsHttp, $http, $stateParams, $state, $log) {           
        $scope.mobileObj = UtilsHttp.getMobileObj();
        $scope.a = "nikhil";
        if ($scope.mobileObj == undefined) {
            $state.go('mobiles');
        }
        $scope.$on("emitEvent", function (event, data) {
            $scope.a = data.a;
        });
        // $rootScope.$on("myEvent", function (event, data) {		
        // 	console.log(data);
        // });
        $scope.name = $stateParams.name;
        $scope.showAddBtn = true;

        $scope.addToCart = function (obj) {
            $scope.showAddBtn = false;
            $rootScope.cartCount++;
            $http.post('/addToCart', $scope.mobileObj).then(function (response) {
            });
        }
    });