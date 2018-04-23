angular.module('Pto', [])

.controller('PtoCtrl', function($scope,$state,$http,$rootScope) {

  $scope.min = {
    other: 0
  }
	
  $scope.standard = true;
  $scope.standarButton = function() {
    $scope.standard = true;
    $scope.other = false;
  }
  $scope.otherButton = function() {
    $scope.standard = false;
    $scope.other = true;
  }

  $scope.otherSlide = {
    min: 0,
    max: 24,
    ceil: 24,
    floor: 0,
    onEnd: $scope.myEndListener
  };

 $scope.myEndListener = function(sliderId) {
    console.log(sliderId, 'has ended with ', $scope.slider.min);
}

})