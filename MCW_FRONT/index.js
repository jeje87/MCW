angular.module('myApp').controller('navbarDirectiveTestCtrl',['$scope','$location', function($scope,$location){
    //=== Variables ===//

    $scope.affixed = 'top';
    $scope.search = {
        show : true,
        terms : ''
    };
    $scope.brand = "<span class='glyphicon glyphicon-user'></span> Brand";
    $scope.inverse = true;
    $scope.menus = [
        {
            title : "Administration",
            action : "item.administration"
        },
        {
            divider: true
        },
        {
            title : "Club",
            action : "item.club"
        },
        {
            title : "Catégories",
            action : "item.categories"
        },
        {
            title : "Equipes",
            action : "item.equipes"
        },
        {
            title : "Membres",
            action : "item.membres"
        },
        {
            title : "Calendrier",
            action : "item.calendrier"
        }
    ]; // end menus

    $scope.item = '';
    $scope.styling = 'Inverse';
    $scope.searchDisplay = 'Visible';

    $scope.searchfn = function(){
        alert('Attempting search on: "' + $scope.search.terms + '"');
    }; // searchfn

    $scope.navfn = function(action){
        switch(action){
            case 'item.administration':
                $location.path("/admin/");
                break;
            case 'item.club':
                $location.path("/club/");
                break;
            case 'item.three':
                $scope.item = 'Item three selected.';
                break;
            case 'singular':
                alert('ot');
                $scope.item = 'Singular link item selected.';
                break;
            default:
                $scope.item = 'Default selection.';
                break;
        }; // end switch
    }; // end navfn

    $scope.toggleStyling = function(){
        $scope.inverse = !$scope.inverse;
        if(angular.equals($scope.inverse,true))
            $scope.styling = 'Inverse';
        else
            $scope.styling = 'Default';
    }; // end toggleStyling

    $scope.toggleSearchForm = function(){
        $scope.search.show = !$scope.search.show;
        if(angular.equals($scope.search.show,true))
            $scope.searchDisplay = 'Visible';
        else
            $scope.searchDisplay = 'Hidden';
    }; // end toggleSearchForm

    $scope.addMenu = function(){
        $scope.menus.push({
            title : "Added On The Fly!",
            action : "default"
        });
    }; // end test

    $scope.toggleAffixed = function(){
        switch($scope.affixed){
            case 'top':
                $scope.affixed = 'bottom';
                break;
            case 'bottom':
                $scope.affixed = 'none';
                break;
            case 'none':
                $scope.affixed = 'top';
                break;
        };
    }; // end toggleAffixed
}]);
