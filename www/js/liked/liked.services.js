angular.module('your_app_name.liked.services', [])

.service('ListService', function ($http, $q){
//  this.getUserLists = function(){
//    var dfd = $q.defer();
//    $http.get('logged_user_db.json').success(function(database) {
//      dfd.resolve(database.user.lists);
//    });
//    return dfd.promise;
//  };

//  this.getList = function(listId){
//    var dfd = $q.defer();
//    $http.get('logged_user_db.json').success(function(database) {
//      var list = _.find(database.user.lists, function(list){
//        return list.id == listId;
//      });
//      dfd.resolve(list);
//    });
//
//    return dfd.promise;
//  };
})

;
