/*
 * About Controller
 */
(function () {
  'use strict';

  // Controller definition
  angular
    .module('myApp')
    .controller('AboutController', AboutController);
  // Inject dependencies
  AboutController.$inject = ['$scope'];
  
  // Controller function
  function AboutController($scope) {
    var vm = this;
    $scope.abc = "Test"
    // Controller properties
    vm.title = 'About Page';
    vm.appInfo = {
      name: 'Angular 1.8 ES5 App',
      version: '1.0.0',
      description: 'A simple Angular 1.8 application using ES5 syntax',
      technologies: [
        'Angular 1.8.3',
        'ES5 JavaScript',
        'Gulp',
        'Bootstrap 4'
      ]
    };
  }
})();
