angular.module('Dashboard', [])

.controller('DashCtrl', function($scope,$state,$http,$rootScope,$timeout,$cordovaSocialSharing,$cordovaInAppBrowser,$ionicLoading) {
  /*This used header company name in dashboard screen*/
  $rootScope.company_name=$rootScope.company_Details.company_name;
  
  /*Preloader option using get a new conpany details in margino*/
  $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
  });

  /*Over all get method in Margino Details*/

  $http.get(CommonURL + "/recruiters/configuration_details?company_id="+$rootScope.company_Details.id)
    .then(function(response) {
        $rootScope.OverAllData = response.data;
        $timeout(function() {
        $ionicLoading.hide();
      });
   },function(err){
      $timeout(function() {
        $ionicLoading.hide();
      });
   });
  
  /*To click start button The direct to cost calculator */
  $scope.start = function() {
    $state.go("tab.consultant")
  }

  /*This function used coach marks active or not?*/
  $rootScope.result=function(active){
    if(active == true){
        $rootScope.active=true;
        $rootScope.check_values='true';
        localStorage.setItem("checkbox",$rootScope.check_values);      
        $rootScope.Coachmark_id=2;
        localStorage.setItem("coachmark",$rootScope.Coachmark_id);      
    }
    else if(active == false){
        $rootScope.active=false;
        $rootScope.check_values='all';
        localStorage.setItem("checkbox",$rootScope.check_values);      
        $rootScope.Coachmark_id=1;
        localStorage.setItem("coachmark",$rootScope.Coachmark_id);      
    }        
  }

  /*This is used to Sahre the data in twitter*/
  $scope.sharetwitter=function(message, image, link){
   $cordovaSocialSharing
    .shareViaTwitter(message, image, link)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }

  /*This is used to Sahre the data in Facebook*/
  $scope.sharefb=function(message, image, link){
   $cordovaSocialSharing
    .shareViaFacebook(message, image, link)
    .then(function(result) {
      // Success!
    }, function(err) {
      console.log("Error Facebook")
    });
  }

  /*This is used to Sahre the data in Instagram*/
  $scope.shareInsta=function(social,message,subject,image,link){
   $cordovaSocialSharing
    .canShareVia(social,message,subject,image,link)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }
})