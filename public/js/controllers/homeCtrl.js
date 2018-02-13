angular.module("myApp")
    .controller('homeCtrl', function($scope, $http, $location, $sessionStorage, $rootScope) {

        $scope.record = [];
        // $http.get('/electronicsData').then(function(response) {     // function to receive data from electronics             
        //     $scope.record2 = response.data;
        // });

        // $http.get('/accesoriesData').then(function(response) {      // function to receive data from accessories            
        //     $scope.record1 = response.data;
        // });

        $scope.clickCounter = function(record) {        // function to send data from home to item page

            $sessionStorage.record = record;

        }

        $rootScope.count = 0;
        $rootScope.cartArr = [];
        $scope.add = function(itemName,logSucess) {     //add to cart
            $scope.logSucess=$rootScope.logSucess;
            var flag=0;
            if (logSucess){
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

        $scope.remove = function(itemName) {        //remove from cart
            if($rootScope.count>0){
                $rootScope.count--;
                $rootScope.cartArr.pop(itemName); 
            }
            
        }
    });