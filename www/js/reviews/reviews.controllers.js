angular.module('your_app_name.reviews.controllers', [])

        .controller('ReviewsCtrl', function ($scope, $state, $rootScope, $stateParams, $ionicPlatform,
                $ionicSlideBoxDelegate, ReviewService, $ionicLoading, $ionicUser, $ionicPopup, $cordovaCamera) {
            $scope.review = {};
            $scope.review.mdid = $stateParams.mdid;
            $scope.review.taste = 2;
            $scope.review.comment = "";
//            $scope.review.image = "./img/reviews/dish.png";
            $scope.review.image = "http://foodpinapp.com/yummy/upload/dishes/dish.png";
            $scope.review.imagedata = "http://foodpinapp.com/yummy/upload/dishes/dish.png";
//            $ionicUser.set('dbid', '12');
//            $ionicUser.save();
            $scope.review.userid = $ionicUser.get('dbid');         
            $ionicPlatform.ready(function () {

                $scope.newPicture = function () {
                    var options = {
                        quality: 100,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.CAMERA,
//                    allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 640,
                        targetHeight: 640,
//                    popoverOptions: CameraPopoverOptions,
//                    saveToPhotoAlbum: false,
                        correctOrientation: true
                    };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
//                        $ionicPopup.alert({
//                            title: 'Success',
//                            template: imageData
//                        });
//                    var image = document.getElementById('myImage');
//                        review.image = "data:image/jpeg;base64," + imageData;

                        $scope.review.imagedata = imageData;
                        $scope.review.image = $scope.review.userid + "_" + $scope.review.imagedata.substr($scope.review.imagedata.lastIndexOf('/') + 1);
                        $scope.ftLoad = true;
                        localStorage.set('fotoUp', imageData);
                        $ionicLoading.show({template: 'Fetching Photo...', duration: 500});
                    }, function (err) {
//                        $ionicPopup.alert({
//                            title: 'Failed',
//                            template: 'Please try again: ' + err
//                        });

                        $ionicLoading.show({template: 'Loading Error...', duration: 500});

                    });
                };

                uploadPicture = function () {
                    $ionicLoading.show({template: 'Posting Photo...'});
                    var fileURL = $scope.review.imagedata;
                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = $scope.review.userid + "_" + fileURL.substr(fileURL.lastIndexOf('/') + 1);
                    options.mimeType = "image/jpeg";
                    options.chunkedMode = true;
//                    $ionicPopup.alert({
//                        title: 'Success',
//                        template: $scope.review.image
//                    });
                    var params = {};
                    params.value1 = "someparams";
                    params.value2 = "otherparams";

                    options.params = params;

                    var ft = new FileTransfer();
                    ft.upload(fileURL, encodeURI("http://www.foodpinapp.com/yummy/index.php/Dishes/upload"), viewUploadedPictures, function (error) {
                        $ionicLoading.show({template: 'Error in connection...'});
                        $ionicLoading.hide();
                    }, options);
                };

                var viewUploadedPictures = function () {
                    $ionicLoading.show({template: 'Loading Saved Photos...'});
                    server = "http://www.foodpinapp.com/yummy/index.php/Dishes/upload";
                    if (server) {
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState === 4) {
                                if (xmlhttp.status === 200) {
                                    $ionicPopup.alert({
                                        title: 'Success',
                                        template: xmlhttp.responseText
                                    });
//                                    document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                                }
                                else {
                                    $ionicLoading.show({template: 'Error Loading...', duration: 1000});
                                    return false;
                                }
                            }
                        };
                        xmlhttp.open("GET", server, true);
                        xmlhttp.send();
                    }

                    $ionicLoading.hide();
                };

//                $cordovaPlugin.someFunction().then(success, error);
            });
            $scope.cancelRefine = function () {
                var previous_view = _.last($rootScope.previousView);
                $state.go(previous_view.fromState, previous_view.fromParams);
            };
            $scope.saveReview = function () {
                $ionicLoading.show({
                    template: 'Saving...'
                }).then(function () {

                    console.log("The loading indicator is now displayed");
                });


                ReviewService.addReview($scope.review).then(function () {
                    $ionicLoading.show({template: 'Review saved successfuly...', duration: 500});
                }, function (error) {
                    $ionicPopup.alert({
                        title: 'Failed',
                        template: error
                    });
                });
                //
                if ($scope.review.image !== 'http://foodpinapp.com/yummy/upload/dishes/dish.png')
                {
                    uploadPicture();
                }
                var previous_view = _.last($rootScope.previousView);
                $ionicLoading.hide().then(function () {
                    console.log("The loading indicator is now hidden");
                });
                $state.go(previous_view.fromState, previous_view.fromParams);
            };
            $scope.lockSlide = function () {
                $ionicSlideBoxDelegate.$getByHandle('filter-tabs-slider').enableSlide(false);
            };
        })

        ;
