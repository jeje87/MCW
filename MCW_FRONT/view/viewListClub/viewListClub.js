'use strict';

angular.module('myApp.viewListClub', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewListClub', {
    templateUrl: 'view/viewListClub/viewListClub.html',
    controller: 'viewListClubCtrl'
  });
}])

.controller('viewListClubCtrl', ['$scope', function ($scope) {
  $scope.listeClub = [
    { "nom": "Martin", "ville": "Catty" },
    { "nom": "Nicolas", "ville": "Cavigneaux" },
    { "nom": "Nicolas", "ville": "Zermati" },
    { "nom": "Victor", "ville": "Darras" },
    { "nom": "Jonathan", "ville": "François" },
    { "nom": "Numa", "ville": "Claudel" }
  ];

  $scope.showClub = true;
}]);