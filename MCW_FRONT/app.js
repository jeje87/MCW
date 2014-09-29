'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.calendar',
  'myApp.viewAdmin',
  'myApp.viewListClub',
  'myApp.viewCalendrier',
  'myApp.viewTest'   
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/viewAdmin'});
}]);
