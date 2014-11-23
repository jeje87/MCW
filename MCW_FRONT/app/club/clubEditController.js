'use strict';

angular.module('clubEdit').controller('clubEditController',['$scope','$routeParams','$location','clubService','ngDialog', function($scope,$routeParams,$location,clubService,ngDialog) {

    var club_id=$routeParams.club_id;
    if (club_id)
        $scope.mode = "Edit";
    else
        $scope.mode = "Ajout";

    function init() {
        clubService.getClub(club_id).then(
            function(data) {
                $scope.club = data;
            }
        );


    }

    $scope.delete  = function() {

        ngDialog.open({
            template: 'app/modal/confirm.html',
            className: 'ngdialog-theme-plain',
            controller: ['$scope', function($scope) {
                // controller logic
            }]
        })
        .closePromise.then(function (data) {
            if(data.value==="1") {
                clubService.deleteClub($scope.club).then(
                    function(data) {
                        if(data.message==="OK"){
                            backToList();
                        }
                        else {
                            alert(data.message);
                        }
                    }
                ).then(null, function (error) {
                        alert(error);
                });
            }
        });

    };

    $scope.add = function() {
        $scope.mode = "Ajout";
        $scope.club=null;

    };


    $scope.copy  = function() {
        $scope.club._id=null;
    };

    $scope.back  = function() {
        backToList();
    };

    function backToList()
    {
        $location.path("/admin/");
    }

    $scope.save  = function() {
        clubService.saveClub($scope.club).then(
        function(data) {
            $scope.club = data;
            $scope.mode = "Edit";
        }
        ).then(null, function (error) {
                alert(error);
        });
     ;};

    init();

}]);

angular.module('clubEdit').controller('ModalController', ['$scope', 'close', function($scope, close) {

    $scope.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };
}]);