'use strict';

angular.module('clubFiche').controller('clubFicheController',['$scope','$routeParams','$location','clubService','ngDialog', function($scope,$routeParams,$location,clubService,ngDialog) {

    var club_id=$routeParams.club_id;
    if (club_id)
        $scope.mode = "Edit";
    else
        $scope.mode = "Ajout";

    function init() {
        clubService.getClub(club_id).then(
            function(data) {
                $scope.club = data;
                for (var i=0; i<$scope.club.images.length; i++) {
                    $scope.addSlide(clubService.getFullImagePath($scope.club, $scope.club.images[i]));
                    console.log($scope.club.images[i]);
                }
            }
        );


    }

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function(imagePath) {
        var newWidth = 750 + slides.length + 1;
        slides.push({
            image: imagePath
        });
    };


    init();

}]);