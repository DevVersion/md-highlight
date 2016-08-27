angular.module('MyApp').directive('hljs', function($timeout, $q, $interpolate) {
  return {
    restrict: 'AE',
    scope: {
      code: '=',
      lang: '='
    },
    link: function(scope, element, attr) {

      scope.$watchGroup(['code', 'lang'], function() {
      	update(scope.code || '');
      })

      function update(code) {

    		element.empty();

        var contentParent = angular.element(
          '<table style="width: 100%; font-family: Roboto, Helvetica Neue, sans-serif; line-height: 18.85px; font-size: 13px">' + 
          	'<tbody>' +
          		'<tr>' +
          			'<td style="border-left:solid #000000 1px;border-right:solid #000000 1px;border-bottom:solid #000000 1px;border-top:solid #000000 1px;vertical-align:top;background-color:#0c2238;padding:7px 7px 7px 7px"></td>' +
	          	'</tr>' +
	        	'</tbody>' +
          '</table>'
        );

        contentParent.find('td').append(
        	angular.element(
        		'<pre>' +
		    			'<code class="highlight" ng-non-bindable></code>' +
		    		'</pre>'
        	)
        );

        element.append(contentParent);

        render(code, contentParent);
      }

      function render(contents, parent) {
        var codeElement = parent.find('code');

        // Strip excessive newlines and the leading/trailing newline (otherwise the whitespace
        // calculations below are not correct).
        var strippedContents = contents.replace(/\n{2,}/g, '\n\n').replace(/^\n/, '').replace(/\n$/, '');
        var lines = strippedContents.split('\n');

        // Make it so each line starts at 0 whitespace
        var firstLineWhitespace = lines[0].match(/^\s*/)[0];
        var startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
        lines = lines.map(function(line) {
          return line
            .replace(startingWhitespaceRegex, '')
            .replace(/\s+$/, '');
        });

        var highlightedCode = hljs.highlight(scope.lang || 'js', lines.join('\n'), true);

        highlightedCode.value = highlightedCode.value
          .replace(/=<span class="hljs-value">""<\/span>/gi, '')
          .replace('<head>', '')
          .replace('<head/>', '');

        codeElement.append(highlightedCode.value).addClass('highlight');
      }

    }
  };
});