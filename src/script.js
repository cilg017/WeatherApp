var myWeatherApp = angular.module('weatherApp', []);
myWeatherApp.controller('weatherAppController', function($scope, $http) {
  $scope.city = '';
  $scope.fiveDayForecast = [];
  $scope.defaultCity = '60661';
  $scope.getWeather = function() {
    var apiKey = '1791c86fe68c499a0bc5e701f89d0da4';
    var currentWeatherUrl =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      $scope.city +
      '&appid=' +
      apiKey;
    var forecastUrl =
      'http://api.openweathermap.org/data/2.5/forecast?q=' +
      $scope.city +
      '&appid=' +
      apiKey;

    $scope.convertTempterature = function(temp) {
      var convertedTemp = (temp - 273).toFixed(1) + 'C';
      return convertedTemp;
    };
    $http.get(currentWeatherUrl).success(function(currentWeatherData) {
      $scope.name = currentWeatherData.name;
      $scope.currentTemp = $scope.convertTempterature(
        currentWeatherData.main.temp
      );
      $scope.currentHigh = $scope.convertTempterature(
        currentWeatherData.main.temp_max
      );
      $scope.currentLow = $scope.convertTempterature(
        currentWeatherData.main.temp_min
      );
    });
    $http.get(forecastUrl).success(function(forecastData) {
      for (let i = 0; i < 5; i++) {
        $scope.fiveDayForecast.push(forecastData.list[i]);
        $scope.fiveDayForecast[i].main.temp_max = $scope.convertTempterature(
          $scope.fiveDayForecast[i].main.temp_max
        );
        $scope.fiveDayForecast[i].main.temp_min = $scope.convertTempterature(
          $scope.fiveDayForecast[i].main.temp_min
        );
      }
    });
  };
});
