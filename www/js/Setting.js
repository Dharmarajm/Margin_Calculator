angular.module('Setting', [])

.controller('SettingCtrl', function($scope,$state,$http,$rootScope) {
	$scope.changePassword=function(){
		$state.go('changePassword')
	}
})