angular.module('your_app_name.walkthrough.controllers', [])

        .controller('WelcomeCtrl', function ($scope, $state, $ionicAuth) {

            $scope.Enter = function () {
//                var user = Ionic.User.current();

                if (!$ionicAuth.isAuthenticated()) {
                    $state.go('intro.walkthrough-learn');

                } else
                {
                    $state.go('main.app.map');
                }

            }

        })


        ;
