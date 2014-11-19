'use strict';

angular.module('clubDetail').controller('clubDetailController',['$scope','$routeParams','$location','clubService','ModalService', function($scope,$routeParams,$location,clubService,ModalService) {

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
    };

    $scope.add = function() {
        $scope.mode = "Ajout";
        $scope.club=null;

        ModalService.showModal({
            templateUrl: "app/modal/confirm.html",
            controller: "ModalController"
        }).then(function(modal) {

            //it's a bootstrap element, use 'modal' to show it
            modal.element.modal();
            modal.close.then(function(result) {
                console.log(result);
            });
        });

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

angular.module('clubDetail').controller('ModalController', ['$scope', 'close', function($scope, close) {

    $scope.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };
}]);