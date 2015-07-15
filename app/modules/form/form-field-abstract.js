/**
 * Created by marc on 06/07/15.
 */

angular.module('form').directive('formField', function($compile) {

  return {
    restrict: 'A',
    scope: {
      formField:'=',
      ffModel:'@'
    },
    link: function($scope, $element, $attrs) {
      var model = $attrs.ffModel;
      console.debug('[FormField] model %o', $scope);
      var type = $scope.formField.type;
      var html = '<div form-field-'+type+'="field"></div>';
      var template = angular.element(html);
      var linkFn = $compile(template);
      var linkedElement = linkFn($scope);
      $element.append(linkedElement);
    }

  };

});
