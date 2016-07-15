// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var apiPath ={
    bookList :'http://localhost:4818/api/BookController/getAllBookList'
}
/*var serviceBase = 'http://localhost:8100/';*/
var starter = angular.module('starter', ['ionic', 'starter.controllers','starter.directive','starter.services','ngCordova','ngMessages','ngFileUpload','azureBlobUpload'])

.run(function($ionicPlatform,$state,$rootScope,$ionicSideMenuDelegate,loginServices) {

/*        $rootScope.$watch(function() {
                return $location.path();
            },
            function($path) {
                if ($path.slice(4, 9) == '/auth' || $path == '') {
                    $rootScope.showMenu = false;
                    $ionicSideMenuDelegate.canDragContent(false);
                } else {
                    $rootScope.showMenu = true;
                    $ionicSideMenuDelegate.canDragContent(true);
                }
            });*/

        $rootScope.appReady = {status:false};
        var MobileServiceClient = WindowsAzure.MobileServiceClient;


        //local
      // $rootScope.client= new MobileServiceClient('https://localhost:44302/', '977592479018442');
        //Live
                 $rootScope.client= new MobileServiceClient('https://bookrental.azure-mobile.net/','1723073844580219');
  //             $rootScope.client= new MobileServiceClient('https://localhost:44302/','1723073844580219');
               $ionicPlatform.ready(function() {
                   // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                   // for form inputs)
                   console.log('ionic Ready');
                   $rootScope.appReady.status = true;
                   $rootScope.$apply();
                   if (window.cordova && window.cordova.plugins.Keyboard) {
                       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                   }
                   if (window.StatusBar) {
                       // org.apache.cordova.statusbar required
                       StatusBar.styleDefault();
                   }
                   //$state.go('app.BookListContent');
                   if(window.localStorage.getItem('isLoggedIn') == 'true'){
                       if(angular.isUndefined($rootScope.user)){

               $state.go('app.login');
               window.localStorage.setItem('isLoggedIn', false);
           }

           // $state.go('app.BookListContent');

        }else{
            $state.go('app.login');
        }



    });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
//BookListContent

            .state('app.BookListContent', {
                url: '/BookListContent',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/BookListContent.html',
                        controller: 'bookController'
                    }
                    ,
                    'fabContent': {
                        template: ''
                    }
                }
            })
        .state('app.AddNewBook', {
            url: '/AddNewBook',
            views: {
                'menuContent': {
                    templateUrl: 'templates/AddNewBook.html',
                    controller: 'bookController'
                }
                ,
                'fabContent': {
                    template: ''
                }
            }
        }). state('app.BookDetails', {
            url: '/BookDetails/:bookId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ViewBookDetails.html',
                    controller: 'bookController'
                }
                ,
                'fabContent': {
                    template: ''
                }
            }
        })
        . state('app.EditBookDetails', {
            url: '/EditBookDetails/:bookId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/EditBookDetail.html',
                    controller: 'bookController'
                }
                ,
                'fabContent': {
                    template: ''
                }
            }
        })
    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
        .state('app.logout', {
            url: '/login',
            views: {
                'menuContent': {
                    controller: 'LogOutCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })



    .state('app.UserProfile', {
        url: '/profile/:id',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'bookController'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
        .state('app.UserProfileInfo', {
            url: '/profile',
            views: {
                'menuContent': {
                    templateUrl: 'templates/profile.html',
                    controller: 'bookController'
                },
                'fabContent': {
                    template: '',
                    controller: function ($timeout) {
                        /*$timeout(function () {
                         document.getElementById('fab-profile').classList.toggle('on');
                         }, 800);*/
                    }
                }
            }
        })

    ;


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});

