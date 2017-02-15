var FeedmeApiUrl = 'http://foodpinapp.com/yummy/index.php/';
angular.module('your_app_name.feed.services', [])


        .service('FoodService', function ($http, $q, $ionicUser) {
            this.getProducts = function () {
                var dfd = $q.defer();
                var price = {from:1, to:30};
                price = $ionicUser.get('price_filter',price);
               
//                console.log(SERVICE.url);
                $http.get(FeedmeApiUrl + 'dishes/list/0/0/' + price.from + '/' + price.to).success(function (database) {
                    dfd.resolve(database.products);
                }).error(function (err, statusCode) {
                    console.log(err);
                });
//    $http.get('food_db.json').success(function(database) {
//      dfd.resolve(database.products);
//    });
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
            
            this.hitcount = function (productId) {
                var dfd = $q.defer();
                $http.post(FeedmeApiUrl + 'dishes/hitcount' , productId).success(function (result) {
                    dfd.resolve(result);
                });
                return dfd.promise;
            };
            
            
        });

