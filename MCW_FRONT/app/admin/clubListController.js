'use strict';

angular.module('clubList').controller('clubListController',['$scope','clubService', function($scope,clubService) {

    $scope.clubList = [];
    $scope.totalItems = 0;
    $scope.itemsPerPage = 10;

    $scope.pagination = {
        current: 1
    };

    getResultsPage(0);

    function getResultsPage(pageNumber) {
        clubService.getClubList(pageNumber,$scope.itemsPerPage).then(
            function(data) {
                $scope.clubList = data.clubs;
                $scope.totalItems = data.count
            }
        );
    }

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

}]);

