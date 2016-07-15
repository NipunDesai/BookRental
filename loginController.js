/**
 * Created by Nipun on 25-07-2015.
 */

starter.controller('loginController',['$scope','$rootScope','loginServices','$stateParams','$timeout','$http','$state',function($scope,$rootScope,loginServices,$stateParams,$timeout,$http,$state){

    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: false
    };

    $scope.login = function(){

    }
}]);
