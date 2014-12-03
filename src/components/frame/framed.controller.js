'use strict';
angular.module('angularIframed')
  .directive('framed', [function () {
    return {
      restrict: 'A',
      link: function (scope, el) {
        var frame = el[0];

        scope.$on('framed:refresh', function () {
          console.info('refreshing iframe');
          // Hacky way of reloading iframe due to cross-origin mumbo-jumbo
          frame.src = frame.src;
        });
      }
    };
  }])
  .controller('FramedCtrl', ['$scope', '$location', 'navigatory', function ($scope, $location, navigatory) {
    $scope.fc = {location: 0, positions: ['top left', 'bottom left', 'bottom right', 'top right']};
    $scope.targetUrl = navigatory.getLastPathAsString();
    if (!$scope.targetUrl) { $location.path('/'); }
    
    $scope.refresh = function () {
      $scope.$broadcast('framed:refresh');
    };
    $scope.reposition = function () {
      if ($scope.fc.location < $scope.fc.positions.length - 1) {
        $scope.fc.location++;
      } else {
        $scope.fc.location = 0;
      }
      
    };
  }]);