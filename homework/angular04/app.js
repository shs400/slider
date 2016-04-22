
angular.module('myApp', ['ngResource','chart.js'])
.controller('mainCtrl',function($scope, $resource, $filter){        
        $scope.citys = [{
            name : 'seoul'
        },{
            name : 'tokyo'
        },{
            name : 'newyork'
        },{
            name : 'sanghai'
        }]   
        
        $scope.cnt = '7';
        $scope.city = 'seoul';
        $scope.nowIndex = 0;        
        
        $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?q='+$scope.city+'&cnt='+$scope.cnt+'&APPID=8d554a626fc5d01d77812b612a6de257',{
            callback : 'JSON_CALLBACK'
        },{
            get : { method : 'JSONP'}
        });
        
        $scope.data = []  
        $scope.labels = []      
        $scope.weatherResult = $scope.weatherAPI.get({q :$scope.city, cnt : $scope.cnt, APPID:'8d554a626fc5d01d77812b612a6de257' }, function() {
            for(var i = 0 ; i < $scope.cnt; i++){                    
                $scope.data[i] = Math.round($scope.weatherResult.list[i].temp.day - 273.15);
                $scope.labels[i] = $filter('date')($scope.weatherResult.list[i].dt * 1000,'dd');
            }
            $scope.data = [$scope.data]; 
            $scope.labels = $scope.labels    
            $scope.series = [$scope.city+'의 이번주 날씨'];
            $scope.legend = true;   
            
        });     
                    
        
        $scope.btnClick = function(idx){
           $scope.nowIndex = idx;
           $scope.city = this.city.name;   
                   
           $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?q='+$scope.city+'&cnt='+$scope.cnt+'&APPID=8d554a626fc5d01d77812b612a6de257',{
               callback : 'JSON_CALLBACK'
           },{
               get : { method : 'JSONP'}
           });
           
           var data = {
                q :$scope.city,
                cnt : $scope.cnt 
            };            
            
           $scope.series = [$scope.city+'의 이번주 날씨'];
           
           $scope.weatherResult = $scope.weatherAPI.get({data, APPID:'8d554a626fc5d01d77812b612a6de257' }, function() {
               for(var i=0; i < $scope.cnt; i++){                    
                    $scope.data[i] = Math.round($scope.weatherResult.list[i].temp.day - 273.15);
                    $scope.labels[i] = $filter('date')($scope.weatherResult.list[i].dt * 1000,'dd');
                }                
                $scope.data = [$scope.data];
                $scope.labels = $scope.labels   
           });
           
                       
        }
        
        
        
                
        
        
        


})