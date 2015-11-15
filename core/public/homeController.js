var home = angular.module('dna.home', ['ngResource'])

home.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
    controller: 'homeCtrl'
  })
}])

home.controller('homeCtrl', ['$scope', '$window', '$resource', function ($scope, $window, $resource) {
  var possibleCandidates
  var completed = 0

  function getCandidates(geneName) {
    $resource('http://localhost:10000/get-candidates', {}).get({
      gene: geneName
    }).$promise.then(function successCallback(response) {
      possibleCandidates = response.candidates
      addCandidates(possibleCandidates)
    }, function errorCallback(response) {
      console.log(response)
    })
  }

  function addCandidates(candidates) {
    $resource('http://localhost:12000/add-candidates', {}).get({
      candidates: candidates
    }).$promise.then(function successCallback(response) {
      completed++
      if (completed == 1) { // used for multiple genes
            selectOptimal()
      }
    }, function errorCallback(response) {
      console.log(response)
    })
  }

  function selectOptimal() {
    $resource('http://localhost:12000/get-solution', {}).get()
        .$promise.then(function successCallback(response) {
          $scope.drugs = response.candidates
    }, function errorCallback(response) {
      console.log(response)
    })
  }

  function getMutations(sequence) {
    $resource('http://localhost:9000/getMutations', {}).get({
      gene: sequence
    }).$promise.then(function successCallback(response) {
      $scope.mutations = response.mutation
      if ($scope.mutations.includes('_')) {
        getCandidates($scope.mutations)
      }
    }, function errorCallback(response) {
      console.log(response)
    })
  }

  $scope.processSequence = function(sequence) {
    console.log('this is the sequence: ' + sequence.value)
    getMutations(sequence.value)
  }
}])
