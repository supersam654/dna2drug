var home = angular.module('dna.home', ['ngResource'])

home.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
    controller: 'homeCtrl'
  })
}])

home.controller('homeCtrl', ['$scope', '$window', '$resource', function ($scope, $window, $resource) {
  var possibleCandidates;
  var completed = 0;

  function getCandidates(geneName) {
    $resource('http://localhost:10000/get-candidates', {}).get({
      gene: geneName
    }).$promise.then(function successCallback(response) {
      possibleCandidates = response.candidates
      addCandidates(possibleCandidates)
    }, function errorCallback(response) {
      console.log(response)
    });
  }

  function addCandidates(candidates) {
    $resource('http://localhost:12000/add-candidates', {}).get({
      candidates: candidates
    }).$promise.then(function successCallback(response) {
      completed++
      if (completed == 2) {
            selectOptimal();
      }
    }, function errorCallback(response) {
      console.log(response)
    });
  }

  function selectOptimal() {
    $resource('http://localhost:12000/get-solution', {}).get()
        .$promise.then(function successCallback(response) {
    }, function errorCallback(response) {
      console.log(response)
    });
  }

  function main() {
    var count = 0
    for (count; count < 2; count++) {
      if (count == 0) {
        getCandidates("KIT")
      } else {
        getCandidates("FGFR2")
      }
    }
  }

  main()

}])
