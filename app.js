angular
  .module("MyApp", ['ngMaterial'])
  .controller('AppCtrl', function($scope) {

    $scope.copy = function() {
      var el = document.body.querySelector('hljs table');
      var body = document.body;
      var range = null;
      var sel = null;

      if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
          range.selectNodeContents(el);
          sel.addRange(range);
        } catch (e) {
          range.selectNode(el);
          sel.addRange(range);
        }
      } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
      }

      document.execCommand("Copy");
    }

  })