var app = angular.module("myApp", ["ui.router", "ngStorage"]);
app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url: '/home',
			views: {	
				'navbar': {
					templateUrl: '../partials/components/navbar/navbar.html'
				},				
				'tabs': {
					template: '<home></home>'
				}				
			}
		})
		.state('mobiles', {
			url: '/mobiles',
			views: {	
				'navbar': {
					templateUrl: '../partials/components/navbar/navbar.html'
				},			
				'tabs': {
					template: '<mobile-phones></mobile-phones>'
				}
			}
		})
		.state('laptops', {
			url: '/laptops',
			views: {
				'navbar': {
					templateUrl: '../partials/components/navbar/navbar.html'
				},
				'tabs': {
					template: '<laptops></laptops>'
				}
			}
		})
		.state('televisions', {
			url: '/televisions',
			views: {
				'navbar': {
					templateUrl: '../partials/components/navbar/navbar.html'
				},
				'tabs': {
					template: '<a ui-sref="mobiles">Televisions</a>'
				}
			}
		})
		.state('men', {
			url: '/men',
			views: {
				'navbar': {
					templateUrl: '../partials/components/navbar/navbar.html'
				},
				'tabs': {
					template: '<h3>Men</h3>'
				}
			}
		})
		.state('viewMobile', {
			url: '/mobiles/:name',			
			views: {
				'navbar': {
					templateUrl: '../partials/components/navbar/navbar.html'
				},
				'tabs': {									
					templateUrl: '../partials/components/viewMobile/viewMobile.html'					
				}		
			}			
		})
		.state('cart', {
			url: '/cart',
			views: {
				'tabs': {
					template: '<cart></cart>'
				}
			}
		})
});

app.controller('childCtrl', function ($scope) {
	$scope.enteredText = "nikhil";
	$scope.changed = function () {
		$scope.$emit("emitEvent", { a: $scope.enteredText });
	}
});

app.component('home', {
	templateUrl: 'partials/components/home/home.html',
	controller: homeCtrl
});


app.component('mobilePhones', {
	templateUrl: 'partials/components/mobiles/mobiles.html',
	controller: mobilesCtrl
});

app.component('laptops', {
	templateUrl: 'partials/components/laptops/laptops.html',
	controller: laptopsCtrl
});

app.component('cart', {
	templateUrl: 'partials/components/cart/cart.html',
	controller: cartCtrl
});

app.service('MobilesListHttp', function ($http) {
	this.getMobilesList = function () {
		let mobilesListdata = $http.get('/mobiles').success(function (response) {
			response.data;
		});
		return mobilesListdata;
	}
});

app.service('CartDetailsHttp', function ($http) {
	this.getCartDetails = function () {
		let getCartData = $http.get('/getCartDetails').success(function (response) {
			response.data;
		});
		return getCartData;
	}
});

app.service('UtilsHttp', function () {
	let mobileObj;
	this.setMobileObj = function (obj) {
		mobileObj = obj;
	}
	this.getMobileObj = function () {
		return mobileObj;
	}
});

function homeCtrl() {
	//
}

function cartCtrl(CartDetailsHttp, $scope, $http) {
	// API Call
	CartDetailsHttp.getCartDetails().then(function (response) {
		$scope.mobileArr = response.data;
	});

	$scope.removeFromCart = function (obj) {
		let data = $.param({
			mobileName: obj.mobileName,
			mobilePrice: obj.mobilePrice
		});
		$http.delete('/removeFromCart' + data).then(function (response) {
		});
	}
}

function mobilesCtrl($rootScope, $scope, $http, $state, MobilesListHttp, UtilsHttp, $log) {
	$scope.state = $state;
	getMobilesData();
	function getMobilesData() {
		MobilesListHttp.getMobilesList().then(function (response) {
			$scope.mobileArr = response.data;
		});
	}

	$scope.viewMobile = function (mobileObj) {
		UtilsHttp.setMobileObj(mobileObj);				
		$state.go('viewMobile', { name: mobileObj.mobileName });
		// $rootScope.$emit('myEvent', mobileObj);
	}
}

function laptopsCtrl($scope) {
	$scope.toBeWatched = "hello";
	$scope.arr = [
		{
			"sName": "ala",
			"fName": "bla",
			"gName": "kla"
		},
		{
			"sName": "ghjk",
			"fName": "ihfj",
			"gName": "poisdg"
		}, {
			"sName": "qdgh",
			"fName": "lsdafg",
			"gName": "osdgs"
		}, {
			"sName": "udfbhd",
			"fName": "rcfnhcfg",
			"gName": "psdgs"
		}, {
			"sName": "nsdfgws",
			"fName": "lasdfgs",
			"gName": "jsaf"
		}, {
			"sName": "msdgsd",
			"fName": "akdg",
			"gName": "ygg"
		}, {
			"sName": "ghhasd",
			"fName": "hrerawe",
			"gName": "duila"
		},
	];

	$scope.$watch('toBeWatched', function (newVal, oldVal) {
		// if(newVal != oldVal) {
		// 	console.log("Old Value is: " + oldVal + " New Value is: " + newVal);
		// }
	});
}


