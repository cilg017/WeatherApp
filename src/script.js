var myWeatherApp = angular.module('weatherApp', []);
myWeatherApp.controller('weatherAppController', function($scope, $http) {
  $scope.city = '';

  $scope.defaultCity = '60661';
  $scope.getWeather = function() {
    var apiKey = '1791c86fe68c499a0bc5e701f89d0da4';
    var url =
      'http://api.openweathermap.org/data/2.5/forecast?q=' +
      $scope.defaultCity +
      '&appid=' +
      apiKey;
    $http.get(url).success(function(data) {
      console.log(data);
    });

    //       if ($scope.city) {
    //           $http
    //           .get(url)
    //           .success(function(data) {
    //               console.log(data);
    //           });

    //     } else {
    //       $http
    //         .get(
    //           `{api.openweathermap.org/data/2.5/forecast?zip=${
    //             $scope.defaultCity
    //           },us}`
    //         )
    //         .success(function(data) {
    //           console.log(data);
    //         });
    // }
  };
});
