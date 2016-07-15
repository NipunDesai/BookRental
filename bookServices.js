/**
 * Created by Nipun on 30-05-2015.
 */
/*
var bookServices =(function(){
function bookServices($resource,$log){
this.$resource = $resource;
     this.getBookList = $resource(apiPath.bookList);
}
    bookServices.prototype.getAllBookList = function(){
        return this.getBookList.query().$$promises;
    }
    return bookServices;
}
    ).();

starter.factory('bookServices',function($resource,$log){
   return new bookServices($resource,$log);
});*/

/*var bookRental =angular.module('starter.services', []);
bookRental.factory('bookServices', ['$http','$log','$rootScope',function ($http,$log,$rootScope) {
    return {

        getAllBookList: function () {
            console.log('get book list services called');
            var promise = $rootScope.client.invokeApi("/BookController/getAllBookList", {
                method: 'GET'
            });
            return promise;
        },
        userIsActiveOrNot: function () {
            var promise = $rootScope.client.invokeApi("/BookController/userIsActiveOrNot", {
                method: 'GET'
            });
            return promise;
        },
        addNewBook: function (data) {

            console.log('add new book services called');
            var promise = $rootScope.client.invokeApi("/BookController/addNewBook", {
                method: 'POST',
                body: data
            });
            return promise;
        }
    };
}]);*/

starter.service('bookServices', function($http,$log,$rootScope) {

    this.getAllBookList = function() {

       console.log('get book list services called');
        var promise=$rootScope.client.invokeApi("/BookController/getAllBookList", {
            method: 'GET'
        });
        return promise;
    };

    this.userIsActiveOrNot = function(){
        var promise = $rootScope.client.invokeApi("/BookController/userIsActiveOrNot",{
            method: 'GET'
        });
        return promise;
    };
this.addNewBook = function(bookDetails){

    var promise=$rootScope.client.invokeApi("/BookController/addNewBook", {
        method: 'POST',
        body:bookDetails
    });
    return promise;
};

    this.viewBookDetailsById = function(data){
        var promise = $rootScope.client.invokeApi("/BookController/viewBookDetailsById"+"?bookId="+data,{
           method:'GET' ,
            body:data
        });
        return promise;
    };

    this.getBookInformation = function(data){
      var promise = $rootScope.client.invokeApi("/BookController/getBookInformation",{
          method:'PUT',
          body:data
      })  ;
        return promise;
    };

    this.getUserDetailsById = function(data){
        var promise = $rootScope.client.invokeApi("/BookController/getUserDetailsById" + "?userid=" +data,{
            method:'GET' ,
            body:data
        });
        return promise;
    };

    this.updateUserDetails = function(data){
        var promise = $rootScope.client.invokeApi("/BookController/updateUserDetails",{
            method:'PUT' ,
            body:data
        });
        return promise;
    };


    this.userOtpConfirmation = function(data){
        var promise = $rootScope.client.invokeApi("/BookController/userOtpConfirmation",{
            method:'PUT' ,
            body:data
        });
        return promise;
    };
    this.getUserInformationById = function(data){
        var promise = $rootScope.client.invokeApi("/BookController/getUserInformationById",{
            method:'GET' ,
            body:data
        });
        return promise;
    };

    this.deleteBookDetailsById = function(data){
      var promise = $rootScope.client.invokeApi("/BookController/deleteBookDetails"+"?bookId="+data,{
          method:'GET',
          body:data
      });
        return promise;
    };
this.deleteComment = function(data){
    var promise = $rootScope.client.invokeApi("/BookController/deleteComment"+"?postId="+data,{
        method:'GET',
        body:data
    });
    return promise;
};

    this.updateBookDetailsById = function(data){
      var promise = $rootScope.client.invokeApi("/BookController/updateBookDetails",{
          method:'PUT' ,
          body:data
      })  ;
        return promise;
    };

    this.savePost = function(data){
      var promise = $rootScope.client.invokeApi("/BookController/savePost",{
          method:'POST',
          body:data
      });
        return promise;
    };

    this.commentLikeAndUnlike = function(data){
      var promise = $rootScope.client.invokeApi("/BookController/commentLikeAndUnlike",{
        method:'PUT',
          body:data
      });
        return promise;
    };
});
