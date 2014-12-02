'use strict';

angular.module('angularIframed')
.config(function ($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    
    '**',
  ]);
})
.directive('framed', [function () {
  return {
    restrict: 'A',
    link: function (scope, el, attrs) {
      console.log(scope, el, attrs);
      var frame = el[0];

      scope.$on('framed:refresh', function () {
        console.info('refreshing iframe');
        // Hacky way of reloading iframe due to cross-origin mumbo-jumbo
        frame.src = frame.src;
      });
    }
  };
}])
.service('navigatory', ['$location', function ($location) {
  var lastUrl;
  return {
    navigateTo: function (url) {
      if (url) {
        lastUrl = url;
        $location.path('/framed');
      }
    },
    getLastPath: function () {
      return lastUrl;
    },
    getLastPathAsString: function () {
      if (lastUrl) {
        if (typeof lastUrl === 'string') {
          return 'http://' + lastUrl;
        } else if (typeof lastUrl === 'object') {
          return 'http://' + lastUrl.join('');
        } else {
          return undefined;
        }
      }
    }
  };
}
])
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
}])
.controller('MainCtrl', ['$scope', '$location', 'navigatory', function ($scope, $location, navigatory) {
  $scope.keyboadIsShowing = false; // Show OSK by default
  $scope.locationHash = navigatory.getLastPath() || [];
  $scope.url = $scope.locationHash.length ? $scope.locationHash.join('') : '';

  $scope.keyboard = [
    [{'key': '192.168.', 'class': 'btn-sm btn-link'}, {'key': 'localhost:', 'class': 'btn-sm btn-link'}, {'key': '9001', 'class': 'btn-sm btn-link'}],
    [{'key': '#'}, {'key': '1'}, {'key': '2'}, {'key': '3'}, {'key': '4'}, {'key': '5'}, {'key': '6'}, {'key': '7'}, {'key': '8'}, {'key': '9'}, {'key': '0'}],
    [{'key': 'q'}, {'key': 'w'}, {'key': 'e'}, {'key': 'r'}, {'key': 't'}, {'key': 'y'}, {'key': 'u'}, {'key': 'i'}, {'key': 'o'}, {'key': 'p'}, {'key': 'del', 'class': 'btn-danger'}],
    [{'key': 'a'}, {'key': 's'}, {'key': 'd'}, {'key': 'f'}, {'key': 'g'}, {'key': 'h'}, {'key': 'j'}, {'key': 'k'}, {'key': 'l'}, {'key': ':'}],
    [{'key': 'z'}, {'key': 'x'}, {'key': 'c'}, {'key': 'v'}, {'key': 'b'}, {'key': 'n'}, {'key': 'm'}, {'key': '.'}, {'key': '/'}]
  ];

  $scope.navLinks = [
    {'name': 'Modernizr Test', 'urlHash': ['modernizr.github.io/Modernizr/test']},
    {'name': 'CSS Animations 1', 'urlHash': ['bennettfeely.com/csscreatures']},
    {'name': 'CSS Animations 2', 'urlHash': ['mrdoob.github.io/three.js/examples/css3d_periodictable.html']},
    {'name': 'BrowserMark', 'urlHash': ['browsermark.rightware.com']},
    {'name': 'ACID3', 'urlHash': ['acid3.acidtests.org']}
  ];
  $scope.typekey = function (key) {
    // Using an array system to be able to delete chunks at a time
    if (key === 'del') {
      var removed = $scope.locationHash.pop(-1);
      console.log('"' + removed + '" was removed');
    } else {
      // Parse for any previous manual user input
      $scope.urlParse();
      $scope.locationHash.push(key);
    }
  };

  // purpose: to check for user input made on keyboard instead of OSK
  $scope.urlParse = function () {
    // remove joined locationHash from url
    var tempUrl = angular.copy($scope.url),
        tempHash = angular.copy($scope.locationHash);

    for (var chunk in tempHash) {
      tempUrl = tempUrl.replace(tempHash[chunk], '');
    }
    // append leftovers to locationHash if any
    if (tempUrl.length) {
      $scope.locationHash.push(tempUrl);
    }
  };

  $scope.$watch('locationHash', function (newVal) {
    // Watch as OSK buttons are pressed and update preview url
    if (newVal) {
      $scope.url = $scope.locationHash.join('');
    }
  }, true);

  $scope.navigate = function (url) {
    if (url && typeof url === 'string') {
      navigatory.navigateTo([url || $scope.url]);
    } else {
      navigatory.navigateTo(url || $scope.locationHash);
    }
  };
  $scope.keyboardToggle = function () {
    $scope.keyboadIsShowing = !$scope.keyboadIsShowing;
  };
}]);
