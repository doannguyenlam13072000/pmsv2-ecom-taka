/*
 * Sample Component
 */
(function() {
  'use strict';

  // Component definition
  angular
    .module('myApp')
    .component('sampleComponent', {
      templateUrl: 'app/components/sample/sample.component.html',
      controller: SampleComponentController,
      bindings: {
        value: '<',          // One-way binding for value prop
        onProcess: '&'       // Callback function binding
      }
    });

  // Controller function
  function SampleComponentController() {
    var vm = this;
    console.log(this);

    // Component properties
    vm.title = 'Sample Component';

    // Component methods
    vm.processValue = processValue;
    vm.executeCallback = executeCallback;

    ////////////////

    function processValue(value) {
      return value ? value.toUpperCase() : 'No value provided';
    }

    function executeCallback() {
      if (vm.onProcess) {
        vm.onProcess(vm.value.toUpperCase());
      }
    }
  }

  // Inject dependencies
  SampleComponentController.$inject = [];
})();
