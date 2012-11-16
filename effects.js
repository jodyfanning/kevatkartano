/*jshint browser: true, devel: true, eqeqeq: true, jquery: true */

var KEVATKARTANO = (function (parent, window, undefined) {

	var my = parent.effects = parent.effects || {},
		$ = window.jQuery;

	my.imgRandomRotate = function(article) {
		var styles = ['-moz-transform', '-webkit-transform', '-ms-transform', '-o-transform', 'transform'];
		$(article).find('img').each( function() {
			var rNum = (Math.random()*12)-6;
			var cssRotate = 'rotate('+rNum+'deg)';
			for (var x in styles) {
				$(this).css( styles[x], cssRotate );
			}
		});

		return article;
	};

	$(function() {
		$('#article_section').each(function() {
			my.imgRandomRotate(this);
		});
	});

	return parent;

}(KEVATKARTANO || {}, window));