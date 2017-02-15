angular.module('underscore', [])
        .factory('_', function () {
            return window._; // assumes underscore has already been loaded on the page
        });

angular.module('foodpinapp', [
    'ionic',
    'ionic.cloud',
    'ngCordova',
//  'your_app_name.views',
    'your_app_name.common.controllers',
    'your_app_name.common.directives',
    'your_app_name.account.controllers',
    'your_app_name.account.directives',
    'your_app_name.account.services',
    'your_app_name.auth.controllers',
    'your_app_name.auth.directives',
    'your_app_name.auth.services',
    'your_app_name.content.controllers',
    'your_app_name.content.directives',
    'your_app_name.content.services',
    'your_app_name.feed.controllers',
    'your_app_name.feed.directives',
    'your_app_name.feed.filters',
    'your_app_name.feed.services',
    'your_app_name.map.controllers',
    'your_app_name.map.directives',
    'your_app_name.map.filters',
    'your_app_name.map.services',
    'your_app_name.sort.controllers',
    'your_app_name.filters.controllers',
    'your_app_name.filters.directives',
    'your_app_name.filters.services',
    'your_app_name.reviews.controllers',
    'your_app_name.reviews.services',
    'your_app_name.getting-started.controllers',
    'your_app_name.getting-started.directives',
    'your_app_name.getting-started.services',
//    'your_app_name.liked.controllers',
//    'your_app_name.liked.directives',
//    'your_app_name.liked.services',
    'your_app_name.search.controllers',
    'your_app_name.search.directives',
    'your_app_name.search.filters',
    'your_app_name.search.services',
    'your_app_name.walkthrough.controllers',
    'your_app_name.walkthrough.directives',
    'your_app_name.walkthrough.services',
    'underscore',
    'angularMoment',
    'ngMap',
    'ngRangeSlider'
])
        .config(function ($ionicCloudProvider) {
            $ionicCloudProvider.init({
                "core": {
                    "app_id": "3e8fc825"
                }
            });
        })
        .config(function ($cordovaAppRateProvider) {

            document.addEventListener("deviceready", function () {

                var prefs = {
                    language: 'en',
                    appName: 'FoodPin',
//                    iosURL: 'FoodPin',
                    androidURL: 'market://details?id=com.turingapps.foodpinapp'
//                    windowsURL: 'ms-windows-store:Review?name=<...>'
                };

                $cordovaAppRateProvider.setPreferences(prefs);

            }, false);
        })
        .constant('SERVICE', {
            "url": 'http://foodpinapp.com/yummy/index.php/'
        })

        .run(function ($ionicPlatform, amMoment, $rootScope) {
            $rootScope.previousView = [];

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                var last_state = _.last($rootScope.previousView);

                if (last_state && (last_state.fromState === toState.name)) {
                    $rootScope.previousView.pop();
                } else {
                    $rootScope.previousView.push({"fromState": fromState.name, "fromParams": fromParams});
                }
            });

            $ionicPlatform.ready(function () {
                console.log("$ionicPlatform.ready");
                var push = new Ionic.Push({
                    "debug": true
                });

                push.register(function (token) {
                    console.log("My Device token:", token.token);
                    push.saveToken(token);  // persist the token in the Ionic Platform
                });

                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

                amMoment.changeLocale('en-gb');
            });
        })

        .config(function ($ionicConfigProvider) {
            $ionicConfigProvider.tabs.position('bottom');
            $ionicConfigProvider.views.swipeBackEnabled(false);
            $ionicConfigProvider.form.checkbox('circle');

            if (!ionic.Platform.isWebView())
            {
                console.log("jsScrolling");
                $ionicConfigProvider.scrolling.jsScrolling(false);
            }
        })

        .config(function ($httpProvider) {
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
//  $httpProvider.defaults.headers.put = {};
//  $httpProvider.defaults.headers.patch = {};
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('intro', {
                        url: '/intro',
                        abstract: true,
                        templateUrl: 'views/common/intro.html'
                    })

                    .state('intro.walkthrough-welcome', {
                        url: '/walkthrough-welcome',
                        views: {
                            'intro-view@intro': {
                                templateUrl: 'views/walkthrough/welcome.html',
                                controller: 'WelcomeCtrl'
                            }
                        }
                    })

                    .state('intro.walkthrough-learn', {
                        url: '/walkthrough-learn',
                        views: {
                            'intro-view@intro': {
                                templateUrl: 'views/walkthrough/learn.html',
                                controller: 'GettingStartedCtrl'
                            }
                        }
                    })

                    .state('intro.auth-login', {
                        url: '/auth-login',
                        views: {
                            'intro-view@intro': {
                                templateUrl: 'views/auth/login.html',
                                controller: 'LoginCtrl'
                            }
                        }
                    })

                    .state('intro.auth-signup', {
                        url: '/auth-signup',
                        views: {
                            'intro-view@intro': {
                                templateUrl: 'views/auth/signup.html',
                                controller: 'SignupCtrl'
                            }
                        }
                    })

                    .state('intro.auth-forgot-password', {
                        url: '/forgot-password',
                        views: {
                            'intro-view@intro': {
                                templateUrl: 'views/auth/forgot-password.html',
                                controller: 'ForgotPasswordCtrl'
                            }
                        }
                    })

                    .state('main', {
                        url: '/main',
                        abstract: true,
                        templateUrl: 'views/common/main.html'
                    })

                    .state('main.app', {
                        url: '/app',
                        abstract: true,
                        views: {
                            'main-view@main': {
                                templateUrl: 'views/common/app.html',
                                controller: 'AppCtrl'
                            }
                        }
//                        ,resolve: {
//                            logged_user: function (AuthService) {
//                                return AuthService.getLoggedUser();
//                            }
//                        }
                    })
                    // Aca deberiamos resolver al usuario logueado no?
                    // Como lo haciamos en las otras apps?
                    // DONE

                    .state('main.app.filters', {
                        url: '/filters',
                        views: {
                            'main-view@main': {
                                templateUrl: 'views/filters/filters.html',
                                controller: 'FiltersCtrl'
                            }
                        }
                    })

                    .state('main.app.reviews', {
                        url: '/reviews/:mdid',
                        views: {
                            'main-view@main': {
                                templateUrl: 'views/review/review.html',
                                controller: 'ReviewsCtrl'
                            }
                        }
                    })
                    // Aca va un resolve con los filtros (toda la info y cual corresponde a cada categoria)
                    // Agregar un parametro que sea la categoria desde la que se abrio, o mejor aun,
                    // los filtros que tiene activos, por si el usuario hace click en filters dos veces,
                    // que no se pierda lo que selecciono en un principio

                    .state('main.app.feed', {
                        url: '/feed',
                        views: {
                            'app-feed@main.app': {
                                templateUrl: 'views/feed/feed.html',
                                controller: 'FeedCtrl'
                            }
                        }
                    })

                    .state('main.app.feed.food', {
                        url: '/food',
                        views: {
                            'category-feed@main.app.feed': {
                                templateUrl: 'views/feed/food.html',
                                controller: 'FoodCtrl'
                            }
                        },
                        resolve: {
                            products: function (FoodService) {
                                console.log("resolving food");
                                return FoodService.getProducts();
                            }
                        }
                    })

                    .state('main.app.feed.food.content', {
                        url: '/content/:productId',
                        views: {
                            'main-view@main': {
                                templateUrl: 'views/content/food.html',
                                controller: 'FoodContentCtrl'
                            }
                        },
                        resolve: {
                            product: function (FoodService, $stateParams) {
                                return FoodService.getProduct($stateParams.productId);
                            }
                        }
                    })

                    .state('main.app.feed.map', {
                        url: '/map',
                        views: {
                            'category-feed@main.app.feed': {
                                templateUrl: 'views/feed/map.html',
                                controller: 'MapCtrl'
                            }
                        },
                        resolve: {
                            products: function (FoodService) {
                                console.log("resolving map");
                                return FoodService.getProducts();
                            }
                        }
                    })

                    .state('main.app.map', {
                        url: '/map',
                        views: {
                            'app-map@main.app': {
                                templateUrl: 'views/map/map.html',
                                controller: 'MapCtrl'
                            }
                        },
                        resolve: {
                            products: function (FoodService) {
                                console.log("resolving map");
                                return FoodService.getProducts();

                            }
                        }
                    })

                    .state('main.app.search', {
                        url: '/search',
                        views: {
                            'app-search@main.app': {
                                templateUrl: 'views/search/search.html',
                                controller: 'SearchCtrl'
                            }
                        },
                        resolve: {
                            results: function (FoodService) {
                                return FoodService.getProducts();
                            }
                        }
                    })


                    .state('main.app.liked', {
                        url: '/liked',
                        views: {
                            'app-liked@main.app': {
                                templateUrl: 'views/liked/liked.html',
                                controller: 'LikedCtrl'
                            }
                        },
                        resolve: {
                            lists: function (ListService) {
                                return ListService.getUserLists();
                            }
                        }
                    })
                    // Aca deberiamos resolver las listas salvadas por el usuario.
                    // Cada lista tiene:
                    //    - nombre
                    //    - tags
                    //    - category
                    //    - fecha de creacion de la lista
                    //    - imagen (deberia ser un compilado de las imagenes de los productos que estan en la lista, pero esto es muy complicado, no lo vamos a hacer no?)
                    //    - lista de product_id's
                    // DONE

                    .state('main.app.liked.list-details', {
                        url: '/list-details/:listId',
                        views: {
                            'main-view@main': {
                                templateUrl: 'views/liked/list-details.html',
                                controller: 'ListDetailsCtrl'
                            }
                        },
                        resolve: {
                            list: function (ListService, $stateParams) {
                                return ListService.getList($stateParams.listId);
                            }
                        }
                    })
                    // Tenemos que agregarle un parametro de list_id a esta ruta
                    // Resolver la data de esa lista aca
                    // DONE

                    .state('main.app.liked.new-list', {
                        url: '/new-list',
                        views: {
                            'main-view@main': {
                                templateUrl: 'views/liked/new-list.html',
                                controller: 'NewListCtrl'
                            }
                        }
                    })

                    .state('main.app.account', {
                        url: '/account',
                        views: {
                            'app-account@main.app': {
                                templateUrl: 'views/account/profile.html',
                                controller: 'ProfileCtrl'
                            }
                        },
                        resolve: {
                            user: function (ProfileService) {
                                return ProfileService.getUserData();
                            }
                        }
                    })

//                    .state('main.app.account.profile', {
//                        url: '/profile',
//                        views: {
//                            'my-profile@main.app.account': {
//                                templateUrl: 'views/account/profile.html',
//                                controller: 'ProfileCtrl'
//                            }
//                        },
//                        resolve: {
//                            user: function (ProfileService) {
//                                return ProfileService.getUserData();
//                            }
//                        }
//                    })


                    // Resolver el listado de productos comprados, los atributos en un principio deberian ser:
                    //    - product_id
                    //    - fecha de comprado
                    //    - status (shipped, bla bla)
                    // DONE


                    ;

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/intro/walkthrough-welcome');
            // $urlRouterProvider.otherwise('/main/app/feed/fashion');
        });
