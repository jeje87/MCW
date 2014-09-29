'use strict';

angular.module('myApp.viewAdmin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewAdmin', {
    templateUrl: 'view/viewAdmin/viewAdmin.html',
    controller: 'viewAdminCtrl'
  });
}])

.controller('viewAdminCtrl', [function() {

}]);