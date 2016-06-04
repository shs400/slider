var myApp = angular.module('myApp',['chart.js']).controller('MainCtrl',function($scope){
    
})
.controller('ChartCtrl',function($scope){
    
    $scope.bar = [] || '';
    
    $scope.add = [{
         name : 'chart-line'
     },{
         name : 'chart-bar'
     },{
         name : 'chart-doughnut'
     },{
         name : 'chart-radar'
     },{
         name : 'chart-doughnut'
     }]
     
    $scope.ifFn = function(idx){
        console.log(idx);
    }
    
    $scope.sw = true;
    $scope.sw0 = false;
    $scope.toggle = function(idx){
        var a = JSON.stringify($scope.add[idx]);
        var b = JSON.parse(a);
        
        $scope.sw0 = false;
        $scope.sw1 = false;
        $scope.sw2 = false;
        $scope.sw3 = false;    
        $scope.sw4 = false;
    
        if(idx == 0){
            $scope.sw0 = true;    
        }else if(idx==1){
            $scope.sw1 = true;         
        }else if(idx==2){
            $scope.sw2 = true;         
        }else if(idx==3){
            $scope.sw3 = true;         
        }else if(idx==4){
            $scope.sw4 = true;         
        }
        
        // if(idx == 0){
        //     $scope.sw0 = !$scope.sw0;    
        // }else if(idx==1){
        //     $scope.sw1 = !$scope.sw1;         
        // }else if(idx==2){
        //     $scope.sw2 = !$scope.sw2;         
        // }else if(idx==3){
        //     $scope.sw3 = !$scope.sw3;         
        // }else if(idx==4){
        //     $scope.sw4 = !$scope.sw4;         
        // }
        
        // if( idx == 1 || idx == 2 || idx == 3 || idx == 4 )    
        //     $scope.sw0 = false;
        // if( idx == 0 || idx == 2 || idx == 3 || idx == 4 )    
        //     $scope.sw1 = false;
        // if( idx == 0 || idx == 1 || idx == 3 || idx == 4 )
        //     $scope.sw2 = false;  
        // if( idx == 0 || idx == 1 || idx == 2 || idx == 4 ) 
        //     $scope.sw3 = false;
        // if( idx == 0 || idx == 1 || idx == 2 || idx == 3 )
        //     $scope.sw4 = false;
                  
        //console.log(b.name);
        $scope.bar = b || [];
    }
    
   
//    $scope.asd = function(idx){
//        console.log(idx);
//        console.log(this)
//     //    if(idx == 0){
//     //         $scope.sw0 = true;    
//     //     }else if(idx==1){
//     //         $scope.sw1 = true;         
//     //     }else if(idx==2){
//     //         $scope.sw2 = true;         
//     //     }else if(idx==3){
//     //         $scope.sw3 = true;         
//     //     }else if(idx==4){
//     //         $scope.sw4 = true;         
//     //     }
//    }
   
    $scope.data = [
        [11,22,33,44,55,66,77],
        [43,1,57,45,88,34,64]
    ]
    $scope.oneData = [44,11,345,22,11,111,43];
    $scope.labels = ['월','화','수','목','금','토','일']
    $scope.series = ['A','B','C'];
    $scope.legend = true;
    
    
    $scope.barTypes = [{
        type : "라인"
    },{
        type : '바'
    },{
        type : '도넛'
    },{
        type : '레이더'
    },{
        type : '폴라'
    }]
    
    
})