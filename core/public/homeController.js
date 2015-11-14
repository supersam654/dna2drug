var home = angular.module('dna.home', ['ngResource'])

home.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
    controller: 'homeCtrl'
  })
}])

home.controller('homeCtrl', ['$scope', '$window', '$resource', function ($scope, $window, $resource) {
  function foo() {
    $resource('http://localhost:10000/get-candidates', {}).get({
      gene: 'KIT'
    }).$promise.then(function successCallback(response) {
      console.log(response)
    }, function errorCallback(response) {
      console.log(response)
    });
  }

  foo();

}])
