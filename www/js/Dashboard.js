angular.module('Dashboard', [])

.controller('DashCtrl', function($scope,$state,$http,$rootScope) {
  $scope.start = function() {
    $state.go("tab.consultant")
  }
})