(function()
{
'use strict';

angular.module('LunchCheck',[])

.controller('LunchCheckController',LunchCheckController);
LunchCheckController.$inject=['$scope'];
function LunchCheckController($scope){
  $scope.lunchItems="";
  $scope.message="";
  $scope.myStyle={};
  $scope.borderColor={};
  $scope.splitString=function(){
    var itemList=$scope.lunchItems;
    var comma=",";
    var count=0;
    var totalItems=0;
    var arrayOfItems=itemList.split(comma);

    for (var i=0;i<arrayOfItems.length;i++)
      {
        if(arrayOfItems[i].split(' ').join('')==""){
          count++;
        }
      }
    totalItems=arrayOfItems.length-count;
    if(totalItems==0){
      $scope.myStyle = {'color' : 'red'};
      $scope.borderColor={'border-color':'red'};
      return "Please enter data first";}
    else if(totalItems<=3){
      $scope.myStyle = {'color' : 'green'};
      $scope.borderColor={'border-color':'green'};
      return "Enjoy!"; }
    else {
      $scope.myStyle = {'color' : 'green'};
      $scope.borderColor={'border-color':'green'};
      return "Too much!";
    }
  };

  $scope.checkList=function(){
    $scope.message=$scope.splitString();
  };

}
})();
