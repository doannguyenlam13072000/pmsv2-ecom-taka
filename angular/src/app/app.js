/*
 * Main Angular Application Module
 */
(function() {
  'use strict';

  // Define the main Angular module
  angular
    .module('myApp', [
      'ngRoute'
    ])
    .config(configRoutes);

  // Configure routes
  function configRoutes($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'app/views/about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
      })
      .when('/sample', {
        templateUrl: 'app/views/sample.html',
        controller: 'SampleController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  // Inject dependencies
  configRoutes.$inject = ['$routeProvider', '$locationProvider'];
})();
