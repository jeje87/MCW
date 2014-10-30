'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.calendar',
  'clubList',
  'myApp.viewListClub',
  'myApp.viewCalendrier',
  'myApp.viewTest',
  'angularUtils.directives.dirPagination'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/admin'});
}]);
