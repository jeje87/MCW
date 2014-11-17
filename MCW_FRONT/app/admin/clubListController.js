'use strict';

angular.module('clubList').controller('clubListController',['$scope','$location','clubService','clubListStateService', function($scope,$location, clubService, clubListStateService) {

    $scope.clubList = [];
    $scope.totalItems = 0;
    $scope.itemsPerPage = 10;
    $scope.state=clubListStateService;

    function init() {
        if (!clubListStateService.currentPage)
            clubListStateService.currentPage=1;
        getResultsPage(clubListStateService.currentPage,clubListStateService.search);
    }

    init();

    function getResultsPage(pageNumber, search) {
        clubService.getClubList(pageNumber,$scope.itemsPerPage, search).then(
            function(data) {
                $scope.clubList = data.clubs;
                $scope.totalItems = data.count
            }
        );
    }

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage,clubListStateService.search);
        clubListStateService.currentPage=newPage;
    };

    $scope.rechercherClub = function() {
        if (clubListStateService.search.length>2)
            getResultsPage(1,clubListStateService.search);
        else if (clubListStateService.search.length===0)
            getResultsPage(1);
    };

    $scope.selectRow = function(club) {
        clubListStateService.idSelected=club._id;
        $location.path("/club/"+club._id);
    };


}]);

