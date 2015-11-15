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
  $scope.awaitingInput = true
  $scope.treatment = {}

  function getCandidates(geneName) {
    $resource('http://dna2drug.com:10000/get-candidates', {}).get({
      gene: geneName
    }).$promise.then(function successCallback(response) {
      possibleCandidates = response.candidates
      addCandidates(possibleCandidates)
    }, function errorCallback(response) {
      console.log(response)
    })
  }

  function addCandidates(candidates) {
    $resource('http://dna2drug.com:12000/add-candidates', {}).get({
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
    $resource('http://dna2drug.com:12000/get-solution', {}).get()
        .$promise.then(function successCallback(response) {
          $scope.drugs = response.candidates
    }, function errorCallback(response) {
      console.log(response)
    })
  }

  function getMutations(sequence) {
    $resource('http://dna2drug.com:9000/getMutations', {}).get({
      gene: sequence
    }).$promise.then(function successCallback(response) {
      $scope.mutations = response.mutation
      if ($scope.mutations === 'No match found!') {
        $scope.noMatch = true
      } else {
        $scope.noMatch = false
      }
      if ($scope.mutations.includes('_') && $scope.mutations != 'No match found!') {
        getCandidates($scope.mutations.substring(0, $scope.mutations.indexOf('_')))
        $scope.foundMutation = true
        $scope.getTrials()
      } else {
        $scope.foundMutation = false
      }
    }, function errorCallback(response) {
      console.log(response)
    })
  }

  $scope.processSequence = function(sequence) {
    getMutations(sequence.value)
  }

  $scope.getTrials = function() {
    $resource('/getTrials', {}).get({
      mutation: $scope.mutations
    }).$promise.then(function successCallback(response) {
      $scope.trials = response.trials
    }, function errorCallback(response) {
      console.log(response)
    })
  }

  $scope.openTreatmentModal = function(drug) {
    $scope.treatment = treatmentList[drug]
    $('#modal-treatment').openModal()
  }
}])
