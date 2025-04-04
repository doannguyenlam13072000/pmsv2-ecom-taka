/**
 * Data Service
 */
(function() {
  'use strict';

  angular
    .module('myApp')
    .factory('dataService', dataService);

  dataService.$inject = ['$window'];

  function dataService($window) {
    // Sample data
    var items = [
      'Learn Angular 1.8',
      'Build an app with ES5',
      'Master Angular services',
      'Understand Angular controllers'
    ];

    // Service API
    var service = {
      getItems: getItems,
      addItem: addItem,
      removeItem: removeItem
    };

    return service;

    ////////////////

    function getItems() {
      return items;
    }

    function addItem(item) {
      items.push(item);
    }

    function removeItem(index) {
      items.splice(index, 1);
    }
  }
})();
