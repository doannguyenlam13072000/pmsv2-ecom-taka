/*
 * Home Controller
 */
(function() {
  'use strict';

  // Controller definition
  angular
    .module('myApp')
    .controller('HomeController', HomeController);

  // Controller function
  function HomeController($scope, dataService) {
    var vm = this;
    
    // Controller properties
    vm.title = 'Home Page';
    vm.items = [];
    vm.newItem = '';
    
    // Controller methods
    vm.addItem = addItem;
    vm.removeItem = removeItem;
    
    // Initialization
    activate();
    
    ////////////////
    
    function activate() {
      // Load initial data
      vm.items = dataService.getItems();
    }
    
    function addItem() {
      if (vm.newItem.trim() !== '') {
        dataService.addItem(vm.newItem);
        vm.newItem = '';
      }
    }
    
    function removeItem(index) {
      dataService.removeItem(index);
    }
  }

  // Inject dependencies
  HomeController.$inject = ['$scope', 'dataService'];
})();
