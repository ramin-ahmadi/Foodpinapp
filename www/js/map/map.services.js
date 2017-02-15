var FeedmeApiUrl = 'http://foodpinapp.com/yummy/index.php/';
angular.module('your_app_name.map.services', [])

        .service('MapService', function ($http, $q) {
            this.getProducts = function () {
                var dfd = $q.defer();
                $http.get(FeedmeApiUrl + 'dishes/list/0/0/1/20').success(function (database) {
                    dfd.resolve(database.products);
                }).error(function (err, statusCode) {
                    console.log(err);
                });

                return dfd.promise;
            };

            this.getProduct = function (productId) {
                var dfd = $q.defer();
                $http.get(FeedmeApiUrl + 'dishes/completeInfo/' + productId).success(function (database) {
//    $http.get('food_db.json').success(function(database) {
                    var product = database.product;
//                    var product = _.find(database.products, function (product) {
//                        return product.id == productId;
//                    });
                    dfd.resolve(product);
                });
                return dfd.promise;
            };
        });
