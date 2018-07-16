var myWeatherApp = angular.module('weatherApp', []);
myWeatherApp.controller('weatherAppController', function($scope, $http) {
  var vm = $scope;
  vm.city = '';
  vm.defaultCity = '60661';
  vm.apiKey = '1791c86fe68c499a0bc5e701f89d0da4';
  vm.showWeatherDetails = false; //default to false so first action (user chooses to get weather by location or not) is clear
  vm.days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  //Getting date to get day of the week
  vm.date = new Date();
  vm.today = vm.date.getDay();
  console.log('today ', vm.today);
  var dayIndex = vm.today;
  vm.nextFiveDays = [];

  for (let i = 0; i < 5; i++) {
    //Check if day index is greater than 6; resets back to 0 to prevent undefined
    if (dayIndex > 6) {
      dayIndex = 0;
    }
    vm.nextFiveDays.push(vm.days[dayIndex + 1]);
    dayIndex += 1;
  }
  console.log('next five days ', vm.nextFiveDays);

  //Request user's location
  vm.getLocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(vm.showPosition, vm.showError);
    } else {
      vm.useDefault();
    }
  };

  //Get user's coordinates and call api with coordinates
  vm.showPosition = function(position) {
    var string = position.coords.latitude + ' ' + position.coords.longitude;
    vm.lat = position.coords.latitude;
    vm.lon = position.coords.longitude;
    console.log('coords ', string);
    vm.getWeatherByCoords();
  };

  //All errors default to 60661 weather
  vm.showError = function(error) {
    switch (error.code) {
      default:
        vm.useDefault();
        break;
    }
  };

  //Fetch weather for 60661
  vm.useDefault = function() {
    vm.city = vm.defaultCity;
    vm.getWeatherByZip();
  };

  //convert temp from Kelvin to Celcius
  vm.convertTempterature = function(temp) {
    var convertedTemp = (temp - 273).toFixed(1) + 'C';
    return convertedTemp;
  };

  //gets weather by user's coordinates
  vm.getWeatherByCoords = function() {
    console.log('weather by coords');
    var currentWeatherUrl =
      'http://api.openweathermap.org/data/2.5/weather?lat=' +
      vm.lat +
      '&lon=' +
      vm.lon +
      '&appid=' +
      vm.apiKey;

    var forecastUrl =
      'http://api.openweathermap.org/data/2.5/forecast?lat=' +
      vm.lat +
      '&lon=' +
      vm.lon +
      '&appid=' +
      vm.apiKey;

    vm.getWeather(currentWeatherUrl, forecastUrl);
  };

  //gets weather by zip code
  vm.getWeatherByZip = function() {
    console.log('weather by zip');
    var currentWeatherUrl =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      vm.city +
      '&appid=' +
      vm.apiKey;
    var forecastUrl =
      'http://api.openweathermap.org/data/2.5/forecast?q=' +
      vm.city +
      '&appid=' +
      vm.apiKey;

    vm.getWeather(currentWeatherUrl, forecastUrl);
  };

  vm.getWeather = function(currentWeatherUrl, forecastUrl) {
    vm.showWeatherDetails = true;
    vm.fiveDayForecast = [];

    $http.get(currentWeatherUrl).success(function(currentWeatherData) {
      vm.name = currentWeatherData.name;
      vm.currentTemp = vm.convertTempterature(currentWeatherData.main.temp);
      vm.currentHigh = vm.convertTempterature(currentWeatherData.main.temp_max);
      vm.currentLow = vm.convertTempterature(currentWeatherData.main.temp_min);
    });

    $http.get(forecastUrl).success(function(forecastData) {
      for (let i = 0; i < 5; i++) {
        vm.fiveDayForecast.push(forecastData.list[i]);
        vm.fiveDayForecast[i].main.temp_max = vm.convertTempterature(
          vm.fiveDayForecast[i].main.temp_max
        );
        vm.fiveDayForecast[i].main.temp_min = vm.convertTempterature(
          vm.fiveDayForecast[i].main.temp_min
        );
        vm.fiveDayForecast[i].dayOfWeek = vm.nextFiveDays[i];
      }
    });
  };
});
