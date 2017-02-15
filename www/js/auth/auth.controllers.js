angular.module('your_app_name.auth.controllers', [])

        .controller('LoginCtrl', function ($scope, $state, $ionicLoading, $timeout, $ionicPopup, $ionicAuth, $ionicUser, AuthService) {
            $scope.user = {};

            $scope.user.username = "";
            $scope.user.email = "";
            $scope.user.password = "";
            $scope.user.fullname = "";

            $scope.doLogIn = function () {
                console.log("doing log in");

                $ionicLoading.show({
                    template: 'Loging in...'
                });

                $ionicAuth.login('basic', $scope.user, {remember: true}).then(function (newUser) {
                    //goddamn scope freaking issues
//                    $scope.$apply(function () {
//                        $scope.loginButton.hidden = true;
//                    });


                    console.log('back from custom login, results are ' + JSON.stringify(newUser));
//                    $scope.user = newUser;
                    $state.go('main.app.map');
//                    $state.go('main.app.feed.food');
                    $ionicLoading.hide();
                    //store a custom prop
//                    $scope.user.set('lastLogin', new Date());
//                    $scope.user.save();
                }, function (err) {
                    console.log('error from custom ' + JSON.stringify(err));


                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: err.response.body.error.type,
                        template: err.response.body.error.message
                    });
                });

//                $timeout(function () {
//                    // Simulate login OK
//                    // $state.go('main.app.feed.fashion');
//                    // $ionicLoading.hide();
//
//                    // Simulate login ERROR
//                    $scope.error = "This is an error message";
//                    $ionicLoading.hide();
//                }, 800);
            };

            $scope.doFacebookLogIn = function () {
                console.log("doing FACEBOOK log in");

//                $ionicLoading.show({
//                    template: 'Loging in...'
//                });

                $ionicAuth.login('facebook', {'remember': true}).then(function (newUser) {

//                    var alertPopup = $ionicPopup.alert({
//                        title: "Saved",
//                        template: JSON.stringify($ionicUser.social.facebook.data)
//                    });
//                    var alertPopup = $ionicPopup.alert({
//                        title: "Saved",
//                        template: JSON.stringify($ionicUser.data.social)
//                    });

                    $scope.user.fullname = $ionicUser.social.facebook.uid;
                    $scope.user.username = $ionicUser.social.facebook.data.raw_data.name;
                    $scope.user.email = $ionicUser.social.facebook.data.raw_data.email;
                    $scope.user.password = $ionicUser.social.facebook.data.raw_data.email;
                    $scope.user.image = $ionicUser.social.facebook.data.raw_data.picture.data.url;

//                    var alertPopup = $ionicPopup.alert({
//                        title: "Saved",
//                        template: JSON.stringify($scope.user)
//                    });

                    AuthService.saveUser($scope.user).then(function (data)
                    {
//                        var alertPopup = $ionicPopup.alert({
//                            title: "Saved",
//                            template: JSON.stringify(data)
//                        });
//                        console.log('back from custom login, results are ' + JSON.stringify(newUser));
//                        $scope.user = newUser;
                        $ionicUser.set('dbid', data.data.results);
                        $ionicUser.save();
                        $state.go('main.app.map');
//                        $state.go('main.app.feed.food');
                    });


                    $ionicLoading.hide();

                }, function (err) {
                    console.log('error from custom ' + JSON.stringify(err));


                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: err.response.body.error.type,
                        template: err.response.body.error.message
                    });
                });

//                $timeout(function () {
//                    // Simulate login OK
//                    $state.go('main.app.feed.food');
//                    $ionicLoading.hide();
//
//                    // Simulate login ERROR
//                    // $scope.error = "This is an error message";
//                    // $ionicLoading.hide();
//                }, 800);
            };
        })

        .controller('SignupCtrl', function ($scope, $state, $ionicLoading, $timeout, $ionicModal, AuthService, $ionicPopup, $ionicAuth, $ionicUser) {
            $scope.user = {};

//	$scope.user.name = "Yashar Jackson";
            $scope.user.username = "";
            $scope.user.email = "";
            $scope.user.password = "";
            $scope.user.image = "http://foodpinapp.com/yummy/upload/profiles/users-default-avatar.png";

            $scope.doSignUp = function () {
                console.log("doing sign up");
                $ionicLoading.show({
                    template: 'Creating account...'
                });
                $scope.user.name = $scope.user.username;
                $ionicAuth.signup($scope.user).then(function (newUser) {
                    console.log('signup worked, here is the new user ' + JSON.stringify(newUser));
                    //what's the user ob like now?

                    AuthService.saveUser($scope.user).then(function (data)
                    {
//                        $scope.user = $ionicUser;
//                        console.log('The user ' + JSON.stringify($scope.user));
                        console.log('lets see ' + JSON.stringify(data.data));

                        $ionicAuth.login('basic', $scope.user, {remember: false}).then(function (newUser) {
                            $ionicUser.set('dbid', data.data.results);
                            $ionicUser.save();
                        });
                        $ionicAuth.logout();
                        $ionicUser.load().then(function () {
                            console.log('The user ' + JSON.stringify($scope.user));
                        });
                    }, function (error) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Failure',
                            template: 'There has been a connection failure, please try again'
                        });
                    });

                    //are they logged on? the docs imply NO
                    console.log('newly signed up user logged in?', $ionicAuth.isAuthenticated());
                    var alertPopup = $ionicPopup.alert({
                        title: 'Success',
                        template: 'You have been registered with FoodPin'
                    });
                    $state.go('intro.auth-login');
                    $ionicLoading.hide();

                }, function (error) {
                    console.log('signed failed with ' + JSON.stringify(error));
                    if (error.details[0] == "conflict_email")
                    {
                        var alertPopup = $ionicPopup.alert({
                            title: 'User exists',
                            template: 'Your email has been registered before, try logging in!'
                        });
                        $state.go('intro.auth-login');
                        $ionicLoading.hide();
                    } else if (error.details[0] == "conflict_username")
                    {
                        var alertPopup = $ionicPopup.alert({
                            title: 'User exists',
                            template: 'Sorry, Please use another username!'
                        });
                    }
                });


//                var signupFailure = function (errors) {
//                    for (var err in errors) {
//                        $scope.error = $scope.error + err;
//                        // check the error and provide an appropriate message
//                        // for your application
//                    }
//                };

//                $timeout(function () {
//                    // Simulate login OK
//                    // $state.go('main.app.feed.fashion');
//                    // $ionicLoading.hide();
//
//                    // Simulate login ERROR
//                    $scope.error = "This is an error message";
//                    $ionicLoading.hide();
//                }, 1800);
            };

            $scope.doFacebookSignUp = function () {
                console.log("doing FACEBOOK sign up");

//                $ionicLoading.show({
//                    template: 'Creating account...'
//                });


                $ionicAuth.login('facebook', {'remember': true}).then(function (newUser) {

                    $scope.user.fullname = $ionicUser.social.facebook.uid;
                    $scope.user.username = $ionicUser.social.facebook.data.raw_data.name;
                    $scope.user.email = $ionicUser.social.facebook.data.raw_data.email;
                    $scope.user.password = $ionicUser.social.facebook.data.raw_data.email;
                    $scope.user.image = $ionicUser.social.facebook.data.raw_data.picture.data.url;

//                    var alertPopup = $ionicPopup.alert({
//                        title: "Saved",
//                        template: JSON.stringify($scope.user)
//                    });

                    AuthService.saveUser($scope.user).then(function (data)
                    {
//                        var alertPopup = $ionicPopup.alert({
//                            title: "Saved",
//                            template: JSON.stringify(data)
//                        });
//                        console.log('back from custom login, results are ' + JSON.stringify(newUser));
//                        $scope.user = newUser;
                        $ionicUser.set('dbid', data.data.results);
                        $ionicUser.save();
                        $state.go('main.app.map');
//                        $state.go('main.app.feed.food');
                    });

//                    console.log('back ok from custom login, results are ' + JSON.stringify(newUser));
//                    $scope.user = newUser;
//                    $state.go('main.app.feed.food');
                    $ionicLoading.hide();

                }, function (err) {
                    console.log('error from custom ' + JSON.stringify(err));
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: err.response.body.error.type,
                        template: err.response.body.error.message
                    });
                });

//                $timeout(function () {
//                    // Simulate login OK
//                    $state.go('main.app.feed.food');
//                    $ionicLoading.hide();
//
//                    // Simulate login ERROR
//                    // $scope.error = "This is an error message";
//                    // $ionicLoading.hide();
//                }, 800);
            };

            $ionicModal.fromTemplateUrl('views/legal/privacy-policy.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.privacy_policy_modal = modal;
            });

            $ionicModal.fromTemplateUrl('views/legal/terms-of-service.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.terms_of_service_modal = modal;
            });

            $scope.showTerms = function () {
                $scope.terms_of_service_modal.show();
            };

            $scope.showPrivacyPolicy = function () {
                $scope.privacy_policy_modal.show();
            };
        })

        .controller('ForgotPasswordCtrl', function ($scope, $state, $ionicLoading, $timeout) {
            $scope.user = {};

            $scope.user.email = "";

            $scope.recoverPassword = function () {
                console.log("recover password");

                $ionicLoading.show({
                    template: 'Recovering password...'
                });

                $timeout(function () {
                    // Simulate login OK
                    $state.go('main.app.map');
//                    $state.go('main.app.feed.food');
                    $ionicLoading.hide();

                    // Simulate login ERROR
                    // $scope.error = "This is an error message";
                    // $ionicLoading.hide();
                }, 800);
            };
        });
