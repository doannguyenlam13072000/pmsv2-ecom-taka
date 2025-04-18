/*
 * Sample Controller
 */
(function() {
  'use strict';

  // Controller definition
  angular
    .module('myApp')
    .controller('SampleController', SampleController);

  // Controller function
  function SampleController() {
    var vm = this;

    // Controller methods
    vm.processValue = processValue;

    // Controller properties
    vm.initialValue = 'Hello World';

    ////////////////

    function processValue(value) {
      console.log('Processing value:', value);
      return value ? value.toLowerCase() : 'No value processed';
    }
  }

  // Inject dependencies
  SampleController.$inject = [];
})();
