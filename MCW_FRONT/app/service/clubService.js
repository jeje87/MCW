
angular.module('clubList').service('clubService', ['$http',
    function($http) {

        var self = this;

        self.getClubList = function(page,perPage,search) {

            var request = $http({
                method: "get",
                url: "http://localhost:8080/api/clubs",
                params: {
                    action: "get",
                    page: page,
                    perPage: perPage,
                    search: search
                }
            });

            return( request.then( self.handleSuccess, self.handleError ) );
        };

        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        self.handleError = function(response) {

            // The API response from the server should be returned in a
            // normalized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
                ) {

                return( $q.reject( "An unknown error occurred." ) );

            }

            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );

        };


        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        self.handleSuccess = function (response) {

            return( response.data );

        };

    }
]);
