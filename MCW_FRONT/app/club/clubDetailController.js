'use strict';

angular.module('clubDetail').controller('clubDetailController',['$scope','$routeParams','clubService', function($scope,$routeParams,clubService) {

    var club_id=$routeParams.club_id;

    function init() {
        clubService.getClub(club_id).then(
            function(data) {
                $scope.club = data;
            }
        );
    }

    $scope.delete  = function() {};
    $scope.add = function() {};
    $scope.copy  = function() {};
    $scope.save  = function() {
        clubService.saveClub($scope.club).then(
        function(data) {
            $scope.club = data;
        }
        ).then(null, function (error) {
                alert(error);
        });
     ;};

    init();

}]);