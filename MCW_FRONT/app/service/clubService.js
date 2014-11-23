
angular.module('myApp').service('clubService', ['$http','$q',
    function($http,$q) {

        $http.defaults.headers.common.Authorization = 'Basic U3VwZXJBZG1pbjpzYTE4OTc4MTM7'

        var self = this;
        self.apiUrl = "http://localhost:8080/api/"

        self.getClubList = function(page,perPage,search) {

            var request = $http({
                method: "get",
                url: self.apiUrl + "clubs",
                params: {
                    action: "get",
                    page: page,
                    perPage: perPage,
                    search: search
                }
            });

            return( request.then( self.handleSuccess, self.handleError ) );
        };

        self.getClub = function(club_id) {

            var request = $http({
                method: "get",
                url: self.apiUrl +"clubs/"+club_id,
                params: {
                    action: "get"
                }
            });

            return( request.then( self.handleSuccess, self.handleError ) );
        };


        self.saveClub = function(club) {

            var request;
            if (club._id) {
                request = $http({
                    method: "put",
                    url: self.apiUrl + "clubs/" + club._id,
                    data: club

                })
            }
            else {
                request = $http({
                    method: "post",
                    url: self.apiUrl + "clubs/",
                    data: club
                })
            }

            return( request.then( self.handleSuccess, self.handleError ) );
        };

        self.deleteClub = function(club) {

            var request = $http({
                method: "delete",
                url: self.apiUrl +"clubs/"+club._id,
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
