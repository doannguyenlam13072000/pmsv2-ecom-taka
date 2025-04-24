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

/*
 * Data Service
 */
(function() {
  'use strict';

  // Service definition
  angular
    .module('myApp')
    .factory('dataService', dataService);

  // Service function
  function dataService() {
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

