'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
//  'ui.calendar',
  'ui.select',
  'ngAnimate',
  'clubList',
  'clubEdit',
  'clubFiche',
  'clubImage',
  'angularUtils.directives.dirPagination',
  'ngSanitize',
  'angledNavbar',
  'ngDialog',
  'angularFileUpload'
]).
config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/club/', {
                templateUrl: 'app/club/clubList.htm',
                controller: 'clubListController'
            })
            .when('/club/:club_id', {
                templateUrl: 'app/club/clubFiche.htm',
                controller: 'clubFicheController'
            })
            .when('/club/edit/:club_id', {
                templateUrl: 'app/club/clubEdit.htm',
                controller: 'clubEditController'
            })
            .when('/club/upload/:club_id', {
                templateUrl: 'app/club/clubImage.htm',
                controller: 'clubImageController'
            })
            .otherwise({redirectTo: '/club/'});
}]).
run(['$rootScope', function($rootScope)
    {
//        $rootScope.$on("$routeChangeStart", function (event, next, current) {
//           // if ($windows.sessionStorage.restorestate == "true") {
//                $rootScope.$broadcast('restorestate'); //let everything know we need to restore state
//             //   sessionStorage.restorestate = false;
//           // }
//        });
//
//        //let everthing know that we need to save state now.
//        window.onbeforeunload = function (event) {
//            $rootScope.$broadcast('savestate');
//        };

    }
]);
