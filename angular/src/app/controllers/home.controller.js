/**
 * Home Controller
 */
(function() {
  'use strict';

  angular
    .module('myApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'dataService'];

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
})();
