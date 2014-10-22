'use strict';

angular.module('clubList').controller('clubListCtrl',['$scope','clubService', function($scope,clubService) {

    clubService.getClubList().then(
        function(clubList) {
            $scope.clubList = clubList;
        }
    );

}]);

