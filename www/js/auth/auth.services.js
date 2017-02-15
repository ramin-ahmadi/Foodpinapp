var FeedmeApiUrl = 'http://foodpinapp.com/yummy/index.php/';
angular.module('your_app_name.auth.services', [])

        .service('AuthService', function ($http, $q) {

//            this.getLoggedUser = function () {
//                var dfd = $q.defer();
//                $http.get('logged_user_db.json').success(function (database) {
//                    dfd.resolve(database.user);
//                });
//                return dfd.promise;
//            };

            this.saveUser = function (user) {
                var dfd = $q.defer();
                $http.post(FeedmeApiUrl + 'Users/newuser', user).then(function (result) {
//                $http.get(FeedmeApiUrl + 'Users/newuser/' + user.username + '/' + user.email + '/' + user.password).then(function (result) {
                    dfd.resolve(result);
                }, function (error) {
                    dfd.reject(error);
                });
                return dfd.promise;
            };

//            this.saveUser = function (user) {
//                var val = {};
//                $http.post(FeedmeApiUrl + 'Users/newuser', user).then(function (result) {
//                    val = reult;
//                    return val;
//                });
//
//            };
        })

        ;
