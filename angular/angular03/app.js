angular.module('myApp',['ngRoute'])
.config(function($routeProvider){
    //console.log($routeProvider);
    $routeProvider.when('/',{
        templateUrl : 'firstpage.html',
        controller : 'FirstCtrl'
    })
    .when('/togglelike',{
        templateUrl : 'secondpage.html',
        controller : 'SecondCtrl'
    })
})
.directive('toggleDaynight',function(){
    return {
        replace : false,
        restrict : 'E',
        templateUrl : 'toggle-daynight.html'
    }
})
.directive('toggleLike',function(){
    return {
        replace : false,
        restrict : 'A',
        templateUrl : 'toggle-like.html'
    }
})
.controller('FirstCtrl',function($scope){
    $scope.txt = "toggle-daynight!!"
})
.controller('SecondCtrl',function($scope){
    $scope.txt = "toggle-like!!"
})