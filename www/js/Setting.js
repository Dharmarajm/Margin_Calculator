angular.module('Setting', [])

.controller('SettingCtrl', function($scope,$state,$http,$rootScope) {
	$scope.changePassword=function(){
		$state.go('changePassword')
	}
	$rootScope.Coachmark_id=2;
    localStorage.setItem("coachmark",$rootScope.Coachmark_id);
})