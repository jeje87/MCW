'use strict';

angular.module('clubList').controller('clubListController',['$scope','$location','clubService', function($scope,$location,clubService) {

    $scope.clubList = [];
    $scope.totalItems = 0;
    $scope.itemsPerPage = 10;
    $scope.search = '';

    $scope.pagination = {
        current: 1
    };

    getResultsPage($scope.pagination.current);

    function getResultsPage(pageNumber, search) {
        $scope.pagination.current=1;
        clubService.getClubList(pageNumber,$scope.itemsPerPage, search).then(
            function(data) {
                $scope.clubList = data.clubs;
                $scope.totalItems = data.count
            }
        );
    }

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage,$scope.search);
    };

    $scope.rechercherClub = function() {
        if ($scope.search.length>2)
            getResultsPage(1,$scope.search);
        else if ($scope.search.length===0)
            getResultsPage(1);
    };

    $scope.selectRow = function(club) {
        $location.path("/club/"+club._id);
    };

}]);

