
/*This is using rzModule Slider directive*/

angular.module('starter', ['ionic',
  'rzModule',
  'gg.editableText',
  'ngCordova',
  'Login',
  'Register',
  'Consultant',
  'Dashboard',
  'Setting',
  'Visa',
  'Salary',
  'Relocation',
  'Pto',
  'Misc',
  'Insurance',
  'Summary'
])

.run(function($ionicPlatform,$state,$ionicPopup) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $ionicPlatform.registerBackButtonAction(function(e) {
    e.preventDefault();
     function showConfirm() {
      var confirmPopup = $ionicPopup.show({
       title : 'MARGINO',
       template : 'Are you sure want to exit ?',
       buttons : [{
        text : 'Cancel',
        type : 'button-danger',
       }, {
        text : 'Ok',
        type : 'button-positive',
        onTap : function() {
         ionic.Platform.exitApp();
        }
       }]
      });
     };

      if($state.current.name=='login' || $state.current.name=='register' || $state.current.name=='dashboard' ){
           showConfirm();
      }
      else {
        navigator.app.backHistory();
      }
    }, 100);


})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('top');

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })


  .state('forgotPassword', {
    url: '/forgotPassword',
    templateUrl: 'templates/forgotPassword.html',
    controller: 'forgotCtrl'
  })

    

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })

  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'templates/dashboard.html',
    controller: 'DashCtrl'
  })

  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'SettingCtrl'
  })

  .state('changePassword', {
    url: '/changePassword',
    templateUrl: 'templates/changePassword.html',
    controller: 'changePasswordCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })


  .state('tab.consultant', {
    url: '/consultant',
    views: {
      'consultant': {
        templateUrl: 'templates/consultant.html',
        controller: 'ConsultantCtrl'
      }
    }
  })

  .state('visaStatus', {
    url: '/visaStatus',
    templateUrl: 'templates/visaStatus.html',
    controller: 'VisaStatusCtrl'
  })

   .state('net', {
    url: '/net',
    templateUrl: 'templates/net.html',
    controller: 'NetCtrl'
  })


  .state('tab.pto', {
    url: '/pto',
    views: {
      'pto': {
        templateUrl: 'templates/pto.html',
        controller: 'PtoCtrl'
      }
    }
  })


  .state('tab.relocation', {
    url: '/relocation',
    views: {
      'relocation': {
        templateUrl: 'templates/relocation.html',
        controller: 'RelocationCtrl'
      }
    }
  })

  .state('location_states', {
    url: '/location_states',
    templateUrl: 'templates/location_states.html',
    controller: 'LocationCtrl'
  })


  .state('tab.insurance', {
    url: '/insurance',
    views: {
      'insurance': {
        templateUrl: 'templates/insurance.html',
        controller: 'InsuranceCtrl'
      }
    }
  })


  .state('tab.misc', {
    url: '/misc',
    views: {
      'misc': {
        templateUrl: 'templates/misc.html',
        controller: 'MiscCtrl'
      }
    }
  })


  .state('tab.salary', {
    url: '/salary',
    views: {
      'salary': {
        templateUrl: 'templates/salary.html',
        controller: 'SalaryCtrl'
      }
    }
  })


  .state('tab.summary', {
    url: '/summary',
    views: {
      'summary': {
        templateUrl: 'templates/summary.html',
        controller: 'SummaryCtrl'
      }
    }
  });


/*This using root page if the condition is one time you register next only show login page*/
  if (localStorage.getItem("user") == 0) {
    $urlRouterProvider.otherwise('/login');
  } else {
    $urlRouterProvider.otherwise('/register');
  }

})

/*This dircetive using Swipe the page right and left*/
.directive('tabsSwipable', function($ionicGesture,$rootScope) {
  return {
    restrict: 'A',
    require: 'ionTabs',
    link: function(scope, elm, attrs, tabsCtrl) {
      
      /*Swipe left function using all tabs page*/
      var onSwipeLeft = function() {
        $rootScope.doRefresh();
        var target = tabsCtrl.selectedIndex() + 1;
        if (target < tabsCtrl.tabs.length) {
          scope.data = "swipeleft";
          scope.$apply(tabsCtrl.select(target));
        }
      };

      /*Swipe right function using all tabs page*/
      var onSwipeRight = function() {
        $rootScope.doRefresh();
        var target = tabsCtrl.selectedIndex() - 1;
        if (target >= 0) {
          scope.data = "swiperight";
          scope.$apply(tabsCtrl.select(target));
        }
      };

      var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm)
        .on('swiperight', onSwipeRight);
      scope.$on('$destroy', function() {
        $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
        $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
      });
    }
  };
})
/*This is using common Url  this variable using all http method*/
//var CommonURL = "http://192.168.1.72:4001/api/v1";
var CommonURL = "http://115.111.129.98:4001/api/v1";
