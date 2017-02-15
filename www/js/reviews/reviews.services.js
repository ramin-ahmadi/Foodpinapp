var FeedmeApiUrl = 'http://foodpinapp.com/yummy/index.php/';
angular.module('your_app_name.reviews.services', [])

        .service('ReviewService', function ($http, $q, $cordovaCamera) {

//            this.getSomethiing = function () {
//                var dfd = $q.defer();
//                $http.get('logged_user_db.json').success(function (database) {
//                    dfd.resolve(database.user);
//                });
//                return dfd.promise;
//            };
//            
            this.getReviews = function (mdid) {
                var dfd = $q.defer();
                $http.get(FeedmeApiUrl + 'Dishes/listreview/' + mdid).success(function (database) {
                    dfd.resolve(database);
                });
                return dfd.promise;
            };

            this.getPicture = function (options) {
//                var q = $q.defer();

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    return imageData;
                }, function (err) {
                    return err;
                });

                return q.promise;
            };

            this.addReview = function (review) {
                var dfd = $q.defer();
                $http.post(FeedmeApiUrl + 'Dishes/addreview', review).then(function (result) {
                    dfd.resolve(result);
                }, function (error) {
                    dfd.reject(error);
                });
                return dfd.promise;
            };
        });
