angular.module("myApp")
    .controller('itemCtrl', function($scope, $http, $location, $sessionStorage, $rootScope) {

        $scope.username = "";
        $scope.review = "";
        $scope.rwArr = [];
        $rootScope.rec = $sessionStorage.record;
        $scope.myFunc = function(logSucess) {       //to add review
            $scope.logSucess=$rootScope.logSucess;
            if (logSucess){
                $scope.rwArr.push({
                    username: $scope.username,
                    review: $scope.review
                });
            }
            else{
                alert("please login");
            }
        };
        
        
        $scope.add = function(itemName,logSucess) {     //add to cart
            $scope.logSucess=$rootScope.logSucess;
            if (logSucess){
                var flag=0;
                for(s=0;s<$rootScope.cartArr.length;s++){
                    if(itemName==$rootScope.cartArr[s]){
                        flag=1;
                    } 
                }
                if(flag==0){
                    $rootScope.count++;
                    $rootScope.cartArr.push(itemName);
                }  
            }
            else{
                alert("please login");
            }
        }

        $scope.remove = function(itemName) {             //remove from cart
            if($rootScope.count>0){
                $rootScope.count--;
                $rootScope.cartArr.pop(itemName); 
            }
        }
    });