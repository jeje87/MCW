//Credit: http://stackoverflow.com/a/17850865
angular.module('clubList').factory('httpInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
    var currentRequestsCount = 0;
    return {
        //Everytime a request starts, the loader is displayed
        request: function(config) {
//            currentRequestsCount++;
//            $rootScope.$broadcast('loaderShow');
//            console.log("request");
            return config || $q.when(config)
        },
        //When a request ends, and if there is no request still running, the loader is hidden
        response: function(response) {
//            if ((--currentRequestsCount) === 0) {
//                $rootScope.$broadcast('loaderHide');
//            }
//            console.log("response");
            return response || $q.when(response);
        },
        //When a request fails, and if there is no request still running, the loader is hidden
        responseError: function(response) {
//            if (!(--currentRequestsCount)) {
//                $rootScope.$broadcast('loaderHide');
//            }
            return $q.reject(response);
        }
    };
}]);

angular.module('clubList').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);

