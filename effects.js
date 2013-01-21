/*jshint browser: true, devel: true, eqeqeq: true, plusplus: false, jquery: true */

var KEVATKARTANO = (function (parent, window, undefined) {
	'use strict';

	var my = parent.effects = parent.effects || {},
		$ = window.jQuery;

	my.imgRandomRotate = function (article) {
		var styles = ['-moz-transform', '-webkit-transform', '-ms-transform', '-o-transform', 'transform'];
		$(article.body).find('img').each(function () {
			var rNum = (Math.random() * 12) - 6,
				cssRotate = 'rotate(' + rNum + 'deg)',
				x;
			for (x = 0; x < styles.length; (x++)) {
				$(this).css(styles[x], cssRotate);
			}
		});

		return article;
	};

	$(function () {
		$('#article_section').each(function () {
			my.imgRandomRotate({body: this});
		});
	});

	return parent;

}(KEVATKARTANO || {}, window));