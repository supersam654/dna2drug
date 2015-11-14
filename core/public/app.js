'use strict'

var dna = angular.module('dna', [
  'ngRoute',
  'dna.home'
])

dna.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('!')
  $routeProvider.otherwise({redirectTo: '/'})
}])
