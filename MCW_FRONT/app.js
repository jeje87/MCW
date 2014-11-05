'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.calendar',
  'ui.select',
  'ngAnimate',
  'clubList',
  'clubDetail',
  'angularUtils.directives.dirPagination'
]).
config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/admin', {
            templateUrl: 'app/admin/clubList.htm',
            controller: 'clubListController'
        })
        .when('/club/:club_id', {
            templateUrl: 'app/club/clubDetail.htm',
            controller: 'clubDetailController'
        })
        .otherwise({redirectTo: '/admin'});
}]);
