var home = angular.module('dna.home', ['ngRoute'])

home.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
    controller: 'homeCtrl'
  })
}])

home.controller('homeCtrl', function ($scope, $window, $http) {
  $http({
    url: "http://localhost:10000/get-candidates",
    method: "GET",
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:10000/'
    },
    params: {gene: "KIT"}
 })
})
