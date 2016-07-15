/**
 * Created by Nipun on 25-07-2015.
 */
/*starter.service('loginServices',['$http','$log',function($http,$log){
    this.getExternalLoginData = function(token){
        return $http.get("http://localhost:1424/api/ExternalLoginController/externalLoginCall",token);
        console.log("Get Login Details");
    };


}]);*/
/*
var promise=$rootScope.client.invokeApi("saveuser", {
    method: 'GET',
});*/
var bookRental =angular.module('starter.services', []);
bookRental.factory('loginServices', ['$http','$log','$rootScope',function ($http,$log,$rootScope) {
    var service = {

        saveAccessToken: function (token) {
            $log.info("from service");
            $log.info(token);
            var promise=$rootScope.client.invokeApi("/ExternalLoginController/externalLoginCall", {
                method: 'GET'
            });
            return promise;
        }
    }
    return service;
}]);


