angular.module('Dashboard', [])

.controller('DashCtrl', function($scope,$state,$http,$rootScope,$cordovaSocialSharing,$cordovaInAppBrowser) {
  $rootScope.company_name=$rootScope.company_Details.company_name;
  $http.get(CommonURL + "/recruiters/configuration_details?company_id="+$rootScope.company_Details.id)
    .then(function(response) {
        $rootScope.OverAllData = response.data;
   });
 
  $scope.start = function() {
    $state.go("tab.consultant")
  }

   $scope.boom = function(val) {
        console.log(val);
    };


    $rootScope.result=function(active){
        if(active == true){
            $rootScope.active=true;
            $rootScope.check_values='true';
            localStorage.setItem("checkbox",$rootScope.check_values);      
            $rootScope.Coachmark_id=2;
            localStorage.setItem("coachmark",$rootScope.Coachmark_id);      
        }else if(active == false){
            $rootScope.active=false;
            $rootScope.check_values='all';
            localStorage.setItem("checkbox",$rootScope.check_values);      
            $rootScope.Coachmark_id=1;
            localStorage.setItem("coachmark",$rootScope.Coachmark_id);      
        }        
    }


  $scope.sharetwitter=function(message, image, link){
   $cordovaSocialSharing
    .shareViaTwitter(message, image, link)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }

  $scope.sharefb=function(message, image, link){
   $cordovaSocialSharing
    .shareViaFacebook(message, image, link)
    .then(function(result) {
      // Success!
    }, function(err) {
      /*if (err == false) {

            var options = {
              location: 'yes',
              clearcache: 'yes',
              toolbar: 'no'
            };


            $cordovaInAppBrowser.open('https://play.google.com/store/apps/details?id=com.facebook.katana', '_blank', options)
              .then(function(event) {

              })
              .catch(function(event) {

              })


            $cordovaInAppBrowser.close();

          }*/
      // An error occurred. Show a message to the user
    });
  }

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