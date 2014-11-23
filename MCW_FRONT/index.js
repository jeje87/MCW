angular.module('myApp').controller('navbarDirectiveTestCtrl',['$scope','$location', function($scope,$location){
    //=== Variables ===//

    $scope.affixed = 'top';
    $scope.search = {
        show : false,
        terms : ''
    };
    $scope.brand = "<span class='glyphicon glyphicon-user'></span> MonClub";
    $scope.inverse = true;
    $scope.menus = [
        {
            divider: true
        },
        {
            title : "Clubs",
            action : "item.club",
            isSelected : true
        },
        {
            title : "Catégories",
            action : "item.categories",
            isSelected : false
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
            title : "Calendriers",
            action : "item.calendriers"
        }
    ]; // end menus

    $scope.item = '';
    $scope.styling = 'Inverse';
    $scope.searchDisplay = 'Visible';

    $scope.searchfn = function(){

    }; // searchfn

    $scope.navfn = function(menu){

        for (var menuItem in $scope.menus){
            $scope.menus[menuItem].isSelected=false;
        }
        menu.isSelected=true;

        switch(menu.action){
            case 'item.club':
                $location.path("/club/");
                break;
            case 'item.equipes':

                break;
            case 'item.membres':

                break;
            case 'item.calendriers':

                break;
            default:
                $location.path("/admin/");
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
