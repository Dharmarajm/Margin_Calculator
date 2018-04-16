// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module("rzModule",[]).value("throttle",function(a,b,c){var d,e,f,g=Date.now||function(){return(new Date).getTime()},h=null,i=0;c||(c={});var j=function(){i=c.leading===!1?0:g(),h=null,f=a.apply(d,e),d=e=null};return function(){var k=g();i||c.leading!==!1||(i=k);var l=b-(k-i);return d=this,e=arguments,0>=l?(clearTimeout(h),h=null,i=k,f=a.apply(d,e),d=e=null):h||c.trailing===!1||(h=setTimeout(j,l)),f}}).factory("Slider",["$timeout","$document","throttle",function(a,b,c){var d=function(a,b,c){this.scope=a,this.attributes=c,this.sliderElem=b,this.range=void 0!==c.rzSliderHigh&&void 0!==c.rzSliderModel,this.handleHalfWidth=0,this.maxLeft=0,this.precision=0,this.step=0,this.tracking="",this.minValue=0,this.maxValue=0,this.valueRange=0,this.initRun=!1,this.customTrFn=null,this.fullBar=null,this.selBar=null,this.minH=null,this.maxH=null,this.flrLab=null,this.ceilLab=null,this.minLab=null,this.maxLab=null,this.cmbLab=null,this.init()};return d.prototype={init:function(){var b=this;this.scope.rzSliderTranslate&&(this.customTrFn=this.scope.rzSliderTranslate()),this.initElemHandles(),this.calcViewDimensions(),this.setMinAndMax(),this.precision=void 0===this.scope.rzSliderPrecision?0:+this.scope.rzSliderPrecision,this.step=void 0===this.scope.rzSliderStep?1:+this.scope.rzSliderStep,a(function(){b.updateCeilLab(),b.updateFloorLab(),b.initHandles(),b.bindEvents()}),angular.element(window).on("resize",angular.bind(this,this.calcViewDimensions)),this.initRun=!0;var d=c(function(){b.setMinAndMax(),b.updateLowHandle(b.valueToOffset(b.scope.rzSliderModel)),b.range&&(b.updateSelectionBar(),b.updateCmbLabel())},350,{leading:!1}),e=c(function(){b.setMinAndMax(),b.updateHighHandle(b.valueToOffset(b.scope.rzSliderHigh)),b.updateSelectionBar(),b.updateCmbLabel()},350,{leading:!1});this.scope.$watch("rzSliderModel",function(a,b){a!==b&&d()}),this.scope.$watch("rzSliderHigh",function(a,b){a!==b&&e()})},initHandles:function(){this.updateLowHandle(this.valueToOffset(this.scope.rzSliderModel)),this.range&&(this.updateHighHandle(this.valueToOffset(this.scope.rzSliderHigh)),this.updateSelectionBar(),this.updateCmbLabel())},translateFn:function(a,b,c){c=void 0===c?!0:c;var d=this.customTrFn&&c?""+this.customTrFn(a):""+a,e=!1;(void 0===b.rzsv||b.rzsv.length!=d.length)&&(e=!0,b.rzsv=d),b.text(d),e&&this.getWidth(b)},setMinAndMax:function(){this.minValue=this.scope.rzSliderFloor?+this.scope.rzSliderFloor:this.scope.rzSliderFloor=0,this.scope.rzSliderCeil?this.maxValue=+this.scope.rzSliderCeil:this.scope.rzSliderCeil=this.maxValue=this.range?this.scope.rzSliderHigh:this.scope.rzSliderModel,this.valueRange=this.maxValue-this.minValue},initElemHandles:function(){angular.forEach(this.sliderElem.children(),function(a,b){var c=angular.element(a);switch(b){case 0:this.fullBar=c;break;case 1:this.selBar=c;break;case 2:this.minH=c;break;case 3:this.maxH=c;break;case 4:this.flrLab=c;break;case 5:this.ceilLab=c;break;case 6:this.minLab=c;break;case 7:this.maxLab=c;break;case 8:this.cmbLab=c}},this),this.fullBar.rzsl=0,this.selBar.rzsl=0,this.minH.rzsl=0,this.maxH.rzsl=0,this.flrLab.rzsl=0,this.ceilLab.rzsl=0,this.minLab.rzsl=0,this.maxLab.rzsl=0,this.cmbLab.rzsl=0,this.range||(this.cmbLab.remove(),this.maxLab.remove(),this.maxH.remove(),this.selBar.remove())},calcViewDimensions:function(){var a=this.getWidth(this.minH);this.handleHalfWidth=a/2,this.barWidth=this.getWidth(this.fullBar),this.maxLeft=this.barWidth-a,this.getWidth(this.sliderElem),this.sliderElem.rzsl=this.sliderElem[0].getBoundingClientRect().left,this.initRun&&(this.updateCeilLab(),this.initHandles())},updateCeilLab:function(){this.translateFn(this.scope.rzSliderCeil,this.ceilLab),this.setLeft(this.ceilLab,this.barWidth-this.ceilLab.rzsw),this.getWidth(this.ceilLab)},updateFloorLab:function(){this.translateFn(this.scope.rzSliderFloor,this.flrLab),this.getWidth(this.flrLab)},updateHandles:function(a,b){return"rzSliderModel"===a?(this.updateLowHandle(b),this.range&&(this.updateSelectionBar(),this.updateCmbLabel()),void 0):"rzSliderHigh"===a?(this.updateHighHandle(b),this.range&&(this.updateSelectionBar(),this.updateCmbLabel()),void 0):(this.updateLowHandle(b),this.updateHighHandle(b),this.updateSelectionBar(),this.updateCmbLabel(),void 0)},updateLowHandle:function(a){this.setLeft(this.minH,a),this.translateFn(this.scope.rzSliderModel,this.minLab),this.setLeft(this.minLab,a-this.minLab.rzsw/2+this.handleHalfWidth),this.shFloorCeil()},updateHighHandle:function(a){this.setLeft(this.maxH,a),this.translateFn(this.scope.rzSliderHigh,this.maxLab),this.setLeft(this.maxLab,a-this.maxLab.rzsw/2+this.handleHalfWidth),this.shFloorCeil()},shFloorCeil:function(){var a=!1,b=!1;this.minLab.rzsl<=this.flrLab.rzsl+this.flrLab.rzsw+5?(a=!0,this.hideEl(this.flrLab)):(a=!1,this.showEl(this.flrLab)),this.minLab.rzsl+this.minLab.rzsw>=this.ceilLab.rzsl-this.handleHalfWidth-10?(b=!0,this.hideEl(this.ceilLab)):(b=!1,this.showEl(this.ceilLab)),this.range&&(this.maxLab.rzsl+this.maxLab.rzsw>=this.ceilLab.rzsl-10?this.hideEl(this.ceilLab):b||this.showEl(this.ceilLab),this.maxLab.rzsl<=this.flrLab.rzsl+this.flrLab.rzsw+this.handleHalfWidth?this.hideEl(this.flrLab):a||this.showEl(this.flrLab))},updateSelectionBar:function(){this.setWidth(this.selBar,this.maxH.rzsl-this.minH.rzsl),this.setLeft(this.selBar,this.minH.rzsl+this.handleHalfWidth)},updateCmbLabel:function(){var a,b;this.minLab.rzsl+this.minLab.rzsw+10>=this.maxLab.rzsl?(this.customTrFn?(a=this.customTrFn(this.scope.rzSliderModel),b=this.customTrFn(this.scope.rzSliderHigh)):(a=this.scope.rzSliderModel,b=this.scope.rzSliderHigh),this.translateFn(a+" - "+b,this.cmbLab,!1),this.setLeft(this.cmbLab,this.selBar.rzsl+this.selBar.rzsw/2-this.cmbLab.rzsw/2),this.hideEl(this.minLab),this.hideEl(this.maxLab),this.showEl(this.cmbLab)):(this.showEl(this.maxLab),this.showEl(this.minLab),this.hideEl(this.cmbLab))},roundStep:function(a){var b=this.step,c=(a-this.minValue)%b,d=c>b/2?a+b-c:a-c;return+d.toFixed(this.precision)},hideEl:function(a){return a.css({opacity:0})},showEl:function(a){return a.css({opacity:1})},setLeft:function(a,b){return a.rzsl=b,a.css({left:b+"px"}),b},getWidth:function(a){var b=a[0].getBoundingClientRect();return a.rzsw=b.right-b.left,a.rzsw},setWidth:function(a,b){return a.rzsw=b,a.css({width:b+"px"}),b},valueToOffset:function(a){return(a-this.minValue)*this.maxLeft/this.valueRange},offsetToValue:function(a){return a/this.maxLeft*this.valueRange+this.minValue},bindEvents:function(){this.minH.on("mousedown",angular.bind(this,this.onStart,this.minH,"rzSliderModel")),this.range&&this.maxH.on("mousedown",angular.bind(this,this.onStart,this.maxH,"rzSliderHigh")),this.minH.on("touchstart",angular.bind(this,this.onStart,this.minH,"rzSliderModel")),this.range&&this.maxH.on("touchstart",angular.bind(this,this.onStart,this.maxH,"rzSliderHigh"))},onStart:function(a,c,d){d.stopPropagation(),d.preventDefault(),""===this.tracking&&(this.calcViewDimensions(),this.tracking=c,a.addClass("active"),d.touches?(b.on("touchmove",angular.bind(this,this.onMove,a)),b.on("touchend",angular.bind(this,this.onEnd))):(b.on("mousemove",angular.bind(this,this.onMove,a)),b.on("mouseup",angular.bind(this,this.onEnd))))},onMove:function(a,b){var c,d=b.clientX||b.touches[0].clientX,e=this.sliderElem.rzsl,f=d-e-this.handleHalfWidth;return 0>=f?(0!==a.rzsl&&(this.scope[this.tracking]=this.minValue,this.updateHandles(this.tracking,0),this.scope.$apply()),void 0):f>=this.maxLeft?(a.rzsl!==this.maxLeft&&(this.scope[this.tracking]=this.maxValue,this.updateHandles(this.tracking,this.maxLeft),this.scope.$apply()),void 0):(c=this.offsetToValue(f),c=this.roundStep(c),this.range&&("rzSliderModel"===this.tracking&&c>=this.scope.rzSliderHigh?(this.scope[this.tracking]=this.scope.rzSliderHigh,this.updateHandles(this.tracking,this.maxH.rzsl),this.tracking="rzSliderHigh",this.minH.removeClass("active"),this.maxH.addClass("active")):"rzSliderHigh"===this.tracking&&c<=this.scope.rzSliderModel&&(this.scope[this.tracking]=this.scope.rzSliderModel,this.updateHandles(this.tracking,this.minH.rzsl),this.tracking="rzSliderModel",this.maxH.removeClass("active"),this.minH.addClass("active"))),this.scope[this.tracking]!==c&&(this.scope[this.tracking]=c,this.updateHandles(this.tracking,f),this.scope.$apply()),void 0)},onEnd:function(a){this.minH.removeClass("active"),this.maxH.removeClass("active"),a.touches?(b.unbind("touchmove"),b.unbind("touchend")):(b.unbind("mousemove"),b.unbind("mouseup")),this.tracking=""}},d}]).directive("rzslider",["Slider",function(a){return{restrict:"EA",scope:{rzSliderFloor:"=?",rzSliderCeil:"=?",rzSliderStep:"@",rzSliderPrecision:"@",rzSliderModel:"=?",rzSliderHigh:"=?",rzSliderTranslate:"&"},template:'<span class="bar"></span><span class="bar selection"></span><span class="pointer"></span><span class="pointer"></span><span class="bubble limit"></span><span class="bubble limit"></span><span class="bubble"></span><span class="bubble"></span><span class="bubble"></span>',link:function(b,c,d){return new a(b,c,d)}}}]);

angular.module('starter', ['ionic','rzModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,  $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('top');
 
  $stateProvider

  .state('login', {
     url: '/login',
     templateUrl: 'templates/login.html'
    })

    .state('register', {
       url: '/register',
       templateUrl: 'templates/register.html'
    })

    .state('dashboard', {
     url: '/dashboard',
     templateUrl: 'templates/dashboard.html'
    })

    .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html'
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
        controller:'LoginCtrl'
      }
    }
  })

  .state('visaStatus', {
     url: '/visaStatus',
     templateUrl: 'templates/visaStatus.html',
      controller:'LoginCtrl'
  })

  .state('tab.salary', {
      url: '/salary',
      views: {
        'salary': {
          templateUrl: 'templates/salary.html',
          controller:'LoginCtrl'
        }
    }
  })

  .state('tab.relocation', {
      url: '/relocation',
      views: {
        'relocation': {
          templateUrl: 'templates/relocation.html',
        controller:'LoginCtrl'
        }
    }
  })

  .state('location_states', {
    url: '/location_states',
    templateUrl: 'templates/location_states.html',
        controller:'LoginCtrl'
  })


  .state('tab.pto', {
    url: '/pto',
    views: {
      'pto': {
        templateUrl: 'templates/pto.html',
        controller:'LoginCtrl'
      }
    }
  })

  .state('tab.misc', {
    url: '/misc',
    views: {
      'misc': {
        templateUrl: 'templates/misc.html',
        controller:'LoginCtrl'
      }
    }
  })

 


  .state('tab.insurance', {
    url: '/insurance',
    views: {
      'insurance': {
        templateUrl: 'templates/insurance.html',
        controller:'LoginCtrl'
      }
    }
  })


  .state('tab.summary', {
    url: '/summary',
    views: {
      'summary': {
        templateUrl: 'templates/summary.html',
        controller:'LoginCtrl'
      }
    }
  });
  
  if(localStorage.getItem("user") == 0){
    $urlRouterProvider.otherwise('/login');
  }
  else{
   $urlRouterProvider.otherwise('/register'); 
  }

})

.controller('LoginCtrl',function($state,$scope, $ionicSideMenuDelegate,$rootScope) {
     

      $scope.showMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
      };


  


    $scope.password = 'password';
    
    $scope.ShowPassword = function(){
      if($scope.password == 'password')
        $scope.password = 'text';
      else
        $scope.password = 'password';
    }
/*
    $scope.register = function(){
      localStorage.setItem("user",0)
      $state.go('register');
    }*/

    $scope.save=function(){
      localStorage.setItem("user",0)
      $state.go('login');
    }

    $scope.login=function(){
      $state.go('dashboard');
    }

    $scope.start=function(){
      $state.go("tab.consultant")
    }

    $scope.cancel=function(){
      $state.go("login") 
    }

    $scope.visaname="Visa Status"
    $scope.visa=function(){
      $state.go("visaStatus") 
    }

    $scope.backVisa=function(name){
      $rootScope.visame=name;
      $state.go("tab.consultant") 
    }

    $scope.marginPercentage=45;
    $scope.marginDollar=13.19;

    $scope.anual=true;


    
    $scope.anualButton=function(){
      $scope.hour=false;
      $scope.anual=true;
      $scope.bill=false;
    }
    $scope.hourlyButton=function(){
      $scope.hour=true;
      $scope.anual=false;
      $scope.bill=false;
    }

    $scope.billButton=function(){
      $scope.bill=true;
      $scope.anual=false;
      $scope.hour=false;
    }



    $scope.standard=true;
    $scope.standarButton=function(){
      $scope.standard=true;
      $scope.other=false;
    }
    $scope.otherButton=function(){
      $scope.standard=false;
      $scope.other=true;
    }

    $scope.selectState=function(){
      $state.go("location_states")
    }

    $scope.backLocation=function(){
      $state.go("tab.relocation")
    }

    $scope.misc_bill=true;
    $scope.MiscBill=function(){
      $scope.misc_bill=true;
      $scope.misc_hour=false;
      $scope.miscOne_time=false;
    }

    $scope.MiscHour=function(){
      $scope.misc_bill=false;
      $scope.misc_hour=true;
      $scope.miscOne_time=false;
    }

    $scope.MiscOne=function(){
      $scope.misc_bill=false;
      $scope.misc_hour=false;
      $scope.miscOne_time=true;
    }

    $scope.logout=function(){
      $state.go("login")
      localStorage.clear();
    }

    $scope.email=function(){
      alert("Cost Summary for James is send to your email.")
      $state.go("dashboard")
    }

    $scope.adjRate=42;

    $scope.misc_bill=true;
    /*misc_hour
    miscOne_time*/

    $scope.min={
      dollar:18000,
      bill:18,
      other:0,
      relocation:0,
      mis_bill:1,
      hourly:1,
      rate:1

    }

    $scope.hourSlider = {
      min: 1,
      max: 24,
      ceil: 24,
      floor: 1,
    };

    $scope.rateSlider = {
      min: 1,
      max: 100,
      ceil: 100,
      floor: 1,
    };


    $scope.DollarSlider = {
      min: 18000,
      max: 250000,
      ceil: 250000,
      floor: 18000,
    };  

    $scope.BillSlider = {
      min: 1,
      max: 100,
      ceil: 100,
      floor: 1,
    }; 

    $scope.otherSlide = {
      min: 0,
      max: 24,
      ceil: 24,
      floor: 0,
    };

    $scope.minLocation = {
      min: 0,
      max: 10000,
      ceil: 10000,
      floor: 0,
    }; 


    $scope.MiscbillSlide = {
      min: 1,
      max: 100,
      ceil: 100,
      floor: 1,
    };   
  
    $scope.open=false;



})

.directive('tabsSwipable', function($ionicGesture) {
    return {
      restrict: 'A',
      require: 'ionTabs',
      link: function(scope, elm, attrs, tabsCtrl) {
        var onSwipeLeft = function() {
          var target = tabsCtrl.selectedIndex() + 1;
          if (target < tabsCtrl.tabs.length) {
            scope.data="swipeleft";
            scope.$apply(tabsCtrl.select(target));
          }
        };
        var onSwipeRight = function() {
          var target = tabsCtrl.selectedIndex() - 1;
          if (target >= 0) {
            scope.data="swiperight";
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
});
