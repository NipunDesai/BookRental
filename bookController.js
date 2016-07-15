/**
 * Created by Nipun on 30-05-2015.
 */

starter.controller('bookController',['$scope','$rootScope','bookServices','$stateParams','$timeout','$http','$state','$ionicLoading','$log','Upload','$cordovaCamera','$cordovaToast','azureBlob',function($scope,$rootScope,bookServices,$stateParams,$timeout,$http,$state,$ionicLoading,$log,Upload,$cordovaCamera,$cordovaToast,azureBlob){

    $scope.bookList =[];
    $scope.UserDetails = [];
    $scope.book=[];
    $scope.bookDetailsModel =[];
    $scope.bookPic="";
    $scope.bookDetails = {};
    $scope.imageUrl ="";
    $scope.postCommentAc ={bookId:''};
    $scope.isCommentDisplay = false;
    $scope.ready = false;
    $scope.images = [];
    $scope.isSaveComment = true;
    $scope.isImageDisplay = false;

  /*  $scope.bookDetails = [];*/



    $scope.$parent.showHeader();
   // $scope.isExpanded = false;
$scope.userIsActiveOrNot = function(){
    $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});
  /*  var promise = bookServices.userIsActiveOrNot();*/
    bookServices.userIsActiveOrNot().then(function(user){
        console.log('user is Active.',user);
        var isActiveUser = JSON.parse(user.response);
        $ionicLoading.hide();
        if(isActiveUser.isActive){
            $state.go('app.AddNewBook');
        }
        else{
            $state.go('app.UserProfile', { "id": isActiveUser.userId});
        }

    });
};

    $scope.getUserDetailsById =function(){
        /*var userDetails = $stateParams;*/
        $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});
if($stateParams.id != null && $stateParams.id != null){
    var promise = bookServices.getUserDetailsById($stateParams.id);
    promise.then(function(result){
        console.log("get user Details successfully");
        $scope.UserDetails = JSON.parse(result.response);
        $ionicLoading.hide();
    });
}
        else{
    var promise = bookServices.getUserInformationById();
    promise.then(function(result){
        console.log("get user Details successfully");
        $scope.UserDetails = JSON.parse(result.response);
        $ionicLoading.hide();
    });
}

    };

    $scope.getAllBookList = function(){
        $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});
        $scope.bookList =[];

        var promise = bookServices.getAllBookList();
        promise.then(function(result){
            $scope.bookList = JSON.parse(result.response);
            $scope.$apply();
            $ionicLoading.hide();
        },function(error){
            $ionicLoading.hide();
            console.log("no record found");
        });
       /* bookServices.getAllBookList().then(function(result){
            $scope.bookList = JSON.parse(result.response);
            $scope.$apply();
            $ionicLoading.hide();
        });*/
    };
    $scope.addNewBook = function(bookDetails,addnewbook){

if(addnewbook.$valid){
    bookDetails.ImageList = $scope.images;
     var promise = bookServices.addNewBook(bookDetails);
     promise.then(function(result){
     console.log('add new book controller called.');
     $state.go('app.BookListContent');
     });
}else{
    return ;
}

    };

    $scope.savePost = function(postComment, id) {
        $scope.postCommentAc.bookId = id;
        if(postComment.Comment == null){
            return;
        }
        else{
            if($scope.isSaveComment){
                $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});
                $scope.isSaveComment = false;
                var promise = bookServices.savePost(postComment);
                promise.then(function(result){
                    $scope.postCommentAc ={};
                    $scope.book = JSON.parse(result.response);
                    $scope.bookPic = $scope.book.imageUrl;
                    $ionicLoading.hide();
                    $scope.$apply();
                    console.log('Save Post Successfully.');
                    $scope.isSaveComment = true;
                });
            }

        }

}

    $scope.viewBookDetails = function(data){
        $state.go('app.BookDetails', { "bookId": data});

    };

    $scope.editBookDetails = function(data){
      $state.go('app.EditBookDetails',{"bookId":data})
    };
$scope.viewBookDetailsById = function(){
    $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});
  var promise = bookServices.viewBookDetailsById($stateParams.bookId);
    promise.then(function(result){
$scope.book = JSON.parse(result.response);
        $scope.bookPic = $scope.book.imageUrl;
        $ionicLoading.hide();
        $scope.$apply();
    });
};
    $scope.updateUserDetails = function(data,addUserInfo){
        if(addUserInfo.$valid){
            $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});
            var promise= bookServices.updateUserDetails(data);
            promise.then(function(result){
                $ionicLoading.hide();
                console.log(JSON.parse(result.response));
                $scope.UserDetails = JSON.parse(result.response);
               // $state.go('app.AddNewBook');
            });
        }
        else{
            return;
        }

    };
$scope.userOtpConfirmation = function(data,addUserInfo){
    if(addUserInfo.$valid){
        $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});
        var promise= bookServices.userOtpConfirmation(data);
        promise.then(function(result){
            $ionicLoading.hide();
            console.log(JSON.parse(result.response));
           // $scope.UserDetails = JSON.parse(result.response);
            $state.go('app.AddNewBook');
        });
    }
    else{
        return;
    }
};

    $scope.deleteBookDetailsById = function(data){
      var promise =bookServices.deleteBookDetailsById(data);
        $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});
        promise.then(function(result){
            console.log('delete book successfully.');
            $ionicLoading.hide();
            $state.go('app.BookListContent');
        });
    };

    $scope.deleteComment = function(data){
        $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});
        var promise =bookServices.deleteComment(data);
        promise.then(function(result){
            console.log('delete book successfully.');
            $ionicLoading.hide();
           $scope.viewBookDetailsById();

        });
    }
    $scope.updateBookDetailsById = function(data,addnewbook){
        if(addnewbook.$valid){

            var promise =bookServices.updateBookDetailsById(data);
            promise.then(function(result){
                console.log('update book details successfully.');
                $state.go('app.BookListContent');
            });
        }
        else{
            return ;
        }

    };

    $scope.doUpload = function ($files) {
        $scope.ImageUrl ="";
        var files = $files;
        var fileData = files[0];
        Upload.upload({
            url: 'https://bookrental.azure-mobile.net/api/BookController/uploadBookImage',
            method: 'POST',
            file: fileData

        }).then(
            function (response) {
                console.log(response.data); // will output whatever you choose to return from the server on a successful upload
            $scope.bookPic = response.data.file;
            $scope.imageUrl = response.data.imageUrl;
            },
            function (response) {
                console.log(response); //  Will return if status code is above 200 and lower than 300, same as $http
            }
        );
    };

    $scope.viewCommentDetails = function(){
if($scope.book.postCommentAc.length != 0){
    if($scope.isCommentDisplay){
        $scope.isCommentDisplay = false;
    }
    else{
        $scope.isCommentDisplay = true;
    }
}

    };

    $scope.commentLikeandUnlike =function(postCommment,status,bookId) {

        $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});
        postCommment.status = status;
        postCommment.bookId = bookId;
        var promise = bookServices.commentLikeAndUnlike(postCommment);
        promise.then(function(result) {
            $scope.book = JSON.parse(result.response);
            $scope.bookPic = $scope.book.imageUrl;
            $ionicLoading.hide();
            $scope.$apply();
        console.log("comment Save....");

    });
};


    $rootScope.$watch('appReady.status', function() {
        console.log('watch fired '+$rootScope.appReady.status);
        if($rootScope.appReady.status) $scope.ready = true;
    });

    $scope.selImages = function() {
        window.imagePicker.getPictures(
            function(results) {
                for (var i = 0; i < results.length; i++) {
                    $scope.isImageDisplay = true;
                    console.log('Image URI: ' + results[i]);

                   $scope.bookUpload(results[i]);
                    $scope.images.push(results[i]);
                }
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            }, function (error) {
                console.log('Error: ' + error);
            }
        );

    };

    $scope.bookUpload = function (fileURL) {

    /*    var win = function (r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        var fail = function (error) {
            console.log("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = "text/plain";

        var params = {};
        params.value1 = "test";
        params.value2 = "param";

        options.params = params;

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI("https://bookrental.azure-mobile.net/api/BookController/uploadBookImage"),win, fail, options);*/

    /*    var win = function (r) {
         console.log("Code = " + r.responseCode);
         console.log("Response = " + r.response);
         console.log("Sent = " + r.bytesSent);
         }

         var fail = function (error) {
         console.log("An error has occurred: Code = " + error.code);
         console.log("upload error source " + error.source);
         console.log("upload error target " + error.target);
         }

         var uri = encodeURI("https://bookrental.azure-mobile.net/api/BookController/uploadBookImage");

         var options = new FileUploadOptions();
         options.fileKey="file";
         options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
         options.mimeType="text/plain";

         var headers={'headerParam': $rootScope.fbAccessToken};

         options.headers = headers;

         var ft = new FileTransfer();

         ft.upload(fileURL, uri, win, fail, options);*/
        //var azure = require('azure-storage');
      //  var blobService = azure.createBlobService();
       // var MobileServiceClient = WindowsAzure.MobileServiceClient;
      // var s = $rootScope.client;
        var azureBlod =azureBlob;

        var host = "bookrental" + '.blob.core.windows.net';

     //   var test = azureBlod.upload();
      //  var blobService = $rootScope.client.createBlobService("bookrental", "J/QoVQqGkdu3p5P0K00nztXUXW7zLIE6v2hkhZc2lJLyqeE5fFEaR55ZSCBOCocK+yzmAkLS4uiHPjHloZX49w==", host);
        var win = function(r) {
            console.log("Should not be called.");
        }

        var fail = function(error) {
            // error.code == FileTransferError.ABORT_ERR
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
        var uri = encodeURI("https://bookrental.azure-mobile.net/api/BookController/uploadBookImage");
       /* var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";*/

        var options = new FileUploadOptions();
        options.httpMethod = "POST";
        options.mimeType = "image/jpeg";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
        options.chunkedMode = false;
        options.headers = {
            // We need to set this header.
            'Authorization': $rootScope.fbAccessToken,
            'x-ms-blob-type': 'BlockBlob'
        };
        var ft = new FileTransfer();
      //  ft.upload(encodeURI(fileURL.substr(fileURL.lastIndexOf('/')+1),"https://bookrental.azure-mobile.net/api/BookController/uploadBookImage"), win, fail, options);
        ft.upload(fileURL,"https://bookrental.azure-mobile.net/api/BookController/uploadBookImage", win, fail, options);
    }

    $scope.removeSelectedFile = function($index){
        $scope.images.splice($index,1);
        if($scope.images.length == 0){
            $scope.isImageDisplay = false;

        }
    };


    $scope.getBookInformation = function(data,bookIsbnNumber){
        if(bookIsbnNumber.$valid){

            $ionicLoading.show({template: '<ion-spinner class="android"></ion-spinner>'});

            var promise = bookServices.getBookInformation(data);
            promise.then(function(result) {

                $ionicLoading.hide();
                var bookInfo = JSON.parse(result.response);
                if(bookInfo != null){
                    $scope.bookDetails = JSON.parse(result.response);
                    console.log("get book details", result);
                    $scope.$apply();
                }
               else{
                    $scope.bookDetails = {};
                    $cordovaToast.show('No Data Found', 'long', 'center')
                        .then(function(success) {
                            // success
                        }, function (error) {
                            // error
                        });

                }
            });
        }
        else{
            $cordovaToast.show('Please enter valid 10 digit ISBN', 'long', 'center')
                .then(function(success) {
                    // success
                }, function (error) {
                    // error
                });

        }

    }

}]);