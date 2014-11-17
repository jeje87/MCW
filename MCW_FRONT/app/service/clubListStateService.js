angular.module('clubList').service('clubListStateService', ['$http','$q','$rootScope',
    function($http,$q,$rootScope) {

        var search="";
        var currentPage="";
        var idSelected="";

        $rootScope.$on("savestate", function () {
            console.log("restoreState");
            //angular.fromJson(sessionStorage.userService);
        });


        $rootScope.$on("restorestate", function () {
            console.log("saveState");
            //sessionStorage.userService = angular.toJson(service.model);
        });
    }
]);
