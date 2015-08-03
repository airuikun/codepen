var template =

angular.module('ucpen', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.codemirror'
])

.value('template', '<!DOCTYPE html><html><head><meta charset="utf-8"><style>{{css}}</style></head><body>{{html}}<script>{{javascript}}</script></body></html>')

.factory('compile', function (template, $sce) {
  return function (parts) {
    var code = template.replace(
      /{{(.+?)}}/g,
      function (_, type) {
        return parts[type]
      })
    return $sce.trustAsHtml(code)
  }
})

.factory('save', function ($http) {
  return function (parts) {
    $http.post('/save', parts).then(function (response) {
      console.info(response)
    }).catch(function (response) {
      console.error(response)
    })
  }
})

.run(function ($rootScope, $templateRequest, compile, save) {
  $rootScope.compile = compile
  $rootScope.save = save
  $templateRequest('init.html').then(function (data) {
    $rootScope.html = data
  })

  $templateRequest('init.css').then(function (data) {
    $rootScope.css = data
  })

  $templateRequest('init.js').then(function (data) {
    $rootScope.javascript = data
  })
})














angular.module('ucpen').controller('AccordionDemoCtrl', function ($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});










