'use strict';

angular.module('clubList', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/admin', {
        templateUrl: 'app/admin/clubList.htm',
        controller: 'clubListController'
    });

}]);




