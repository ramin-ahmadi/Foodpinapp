angular.module('your_app_name.account.controllers', [])

        .controller('ProfileCtrl', function ($scope, $ionicPopover, $ionicPopup, $ionicActionSheet, $state, $ionicAuth, $ionicUser, $cordovaAppRate) {
            $scope.user = $ionicUser;
            if (typeof ($ionicUser.social.facebook) !== "undefined") {
                $scope.user.details = $ionicUser.social.facebook.data.raw_data;
                $scope.user.details.image = $ionicUser.social.facebook.data.raw_data.picture.data.url;

            }
//            $scope.changepassaddress = $ionicAuth.passwordResetUrl;
            
               $scope.openChangePassUrl = function () {
                    var win = window.open($ionicAuth.passwordResetUrl, '_blank', 'location=no');
//                    code: "document.cookie = 'Yashar|1478834770|gKpLIwJmcwEMUuJ9k4RtsSz6TFV9R6buwDn1ZjT0zj0|0fa88a461e82c66bb7594761220c9198f7cfa63d27af49d13ce7ee3846d6484e'"
//                    var setCookie =
//                            "document.cookie += 'wordpress_logged_in_862a8476297e0700cb35ad5d5be98be4=Yashar|1479039269|NmtsMO1Lgf7kPe3SWDTWFOuHDm26LTEAKGQnNGqyQsT|8092f7f5618ecb139627db5acdf41de2c3db44511fa74063d2840ba22e087801'; alert('Sorry we cannot open that page. Message from the server is : blahblah');";
//                                        var setCookie =
//                            "document.cookie += 'wordpress_logged_in_862a8476297e0700cb35ad5d5be98be4=Yashar|1479039269|NmtsMO1Lgf7kPe3SWDTWFOuHDm26LTEAKGQnNGqyQsT|8092f7f5618ecb139627db5acdf41de2c3db44511fa74063d2840ba22e087801';";
//                    win.addEventListener("loadstop", function () {
//                        win.executeScript({code: setCookie}, addCookie);
//
////                        document.cookie += 'Yashar|1478834770|gKpLIwJmcwEMUuJ9k4RtsSz6TFV9R6buwDn1ZjT0zj0|0fa88a461e82c66bb7594761220c9198f7cfa63d27af49d13ce7ee3846d6484e';
////                           win.close();
////                        }, 5000);
//                    });   setTimeout(function () {
////                            win.close();
////                        }, 5000);
//                    });
                    return false;
                    // may alse try $window
                };
//            else
//            {
//                $scope.user = $ionicUser;
//            }

//            var alertPopup = $ionicPopup.alert({
//                title: 'user data',
//                template: JSON.stringify($scope.user)
//            });

//            if (!$scope.user.isAuthenticated()) {
//                $state.go('intro.auth-login');
//            } 
//            $scope.user = user;

//            $scope.user_credit_cards = user.credit_cards;
//            $scope.user_shipping_addresses = user.shipping_addresses;
//            $scope.data = {};
//            $scope.data.selected_card = user.credit_cards[0];
//            $scope.data.selected_address = user.shipping_addresses[0];

//            $scope.user.name = user.first_name + ' ' + user.last_name;
//            $scope.user.password = 'pepe123456789';
//            $scope.show_new_address_button = false;
//            $scope.show_new_card_button = false;
            $scope.notifications = {};
            $scope.notifications.promotions = false;
//            $scope.notifications.shipment_updates = true;

//            $ionicPopover.fromTemplateUrl('views/checkout/partials/address-chooser-popover.html', {
//                scope: $scope
//            }).then(function (popover) {
//                $scope.addresses_popover = popover;
//            });

//            $ionicPopover.fromTemplateUrl('views/checkout/partials/card-chooser-popover.html', {
//                scope: $scope
//            }).then(function (popover) {
//                $scope.cards_popover = popover;
//            });

//            $scope.openAddressesPopover = function ($event) {
//                $scope.addresses_popover.show($event);
//            };
//            $scope.selectShippingAddress = function (address) {
//                $scope.addresses_popover.hide();
//            };

//            $scope.openCardsPopover = function ($event) {
//                $scope.cards_popover.show($event);
//            };
//            $scope.selectCreditCard = function (card) {
//                $scope.cards_popover.hide();
//            };

            $scope.logout = function () {
                $ionicActionSheet.show({
                    titleText: 'Are you sure you want to logout?',
                    destructiveText: 'Logout',
                    cancelText: 'Cancel',
                    cancel: function () {
                        return true;
                    },
                    destructiveButtonClicked: function () {
                        $ionicAuth.logout();
                        $state.go('intro.auth-login');
                    }
                });
            };
            
//            $scope.changePass = function () {
//               $ionicAuth.requestPasswordReset($scope.user.details.email);
//                       };

            $scope.rate = function () {
                $cordovaAppRate.promptForRating(true).then(function (result) {
                    // success
                });


            };

//            $scope.showEditCardPopup = function (card) {
//                $scope.card = card;
//
//                var editCardPopup = $ionicPopup.show({
//                    cssClass: 'popup-outer edit-card-view',
//                    templateUrl: 'views/checkout/partials/edit-card-popup.html',
//                    title: '**** ' + card.number.slice(-4),
//                    scope: $scope,
//                    buttons: [
//                        {text: 'Close'},
//                        {
//                            text: 'Delete',
//                            // type: 'icon-left ion-trash-a delete-button',
//                            type: 'delete-button',
//                            onTap: function (e) {
//                                // return $scope.data;
//                            }
//                        },
//                        {
//                            text: 'Edit',
//                            onTap: function (e) {
//                                // return $scope.data;
//                            }
//                        }
//                    ]
//                });
//                editCardPopup.then(function (res) {
//                    if (res)
//                    {
//                        console.log('hacer algo cuando apreta ADD con los datos llenos')
//                    }
//                    else {
//                    }
//                });
//            };

//            $scope.showEditAddressPopup = function (address) {
//                $scope.address = address;
//
//                var editAddressPopup = $ionicPopup.show({
//                    cssClass: 'popup-outer edit-shipping-address-view',
//                    templateUrl: 'views/checkout/partials/edit-shipping-address-popup.html',
//                    title: address.street,
//                    scope: $scope,
//                    buttons: [
//                        {text: 'Close'},
//                        {
//                            text: 'Delete',
//                            // type: 'icon-left ion-trash-a delete-button',
//                            type: 'delete-button',
//                            onTap: function (e) {
//                                // return $scope.data;
//                            }
//                        },
//                        {
//                            text: 'Edit',
//                            onTap: function (e) {
//                                // return $scope.data;
//                            }
//                        }
//                    ]
//                });
//                editAddressPopup.then(function (res) {
//                    if (res)
//                    {
//                        console.log('hacer algo cuando apreta ADD con los datos llenos')
//                    }
//                    else {
//                    }
//                });
//            };
        })

//        .controller('OrdersCtrl', function ($scope, orders, OrderService) {
//            $scope.orders = orders;
//        })


        ;
