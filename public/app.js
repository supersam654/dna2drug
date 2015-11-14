'use strict'

var dna = angular.module('dna', [
  'ngRoute',
  'ngResource'
])

dna.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('!')
  $routeProvider.otherwise({redirectTo: '/'})
}])
