/**
 * About Controller
 */
(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope'];

  function AboutController($scope) {
    var vm = this;
    
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
