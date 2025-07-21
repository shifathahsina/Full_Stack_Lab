angular.module('todoApp', [])
  .controller('TodoController', function($scope, $http) {
    $scope.todos = [];

    // Load from JSON file
    $http.get('/api/todos').then(function(response) {
      $scope.todos = response.data;
    });

    $scope.addTodo = function() {
      if ($scope.newTodo.trim() !== '') {
        $scope.todos.push({ text: $scope.newTodo });
        $scope.newTodo = '';
        saveTodos();
      }
    };

    $scope.removeTodo = function(index) {
      $scope.todos.splice(index, 1);
      saveTodos();
    };

    function saveTodos() {
      $http.post('/api/todos', $scope.todos);
    }
  });
