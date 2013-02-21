/*jshint browser: true, devel: true, eqeqeq: true, plusplus: false, jquery: true */
(function (definition) {
    // CommonJS
    if (typeof exports === "object") {
        module.exports = definition(global);
    // <script>
    } else {
    	if(typeof KEVATKARTANO === 'undefined') {
    		KEVATKARTANO = {};	
    	}
        KEVATKARTANO.effects = definition(window);
    }
})(function (global, undefined) {
	'use strict';

	var my = {},
		$ = global.jQuery;
	
	my.imgRandomRotate = function (container) {
		var styles = ['-moz-transform', '-webkit-transform', '-ms-transform', '-o-transform', 'transform'];
		container.find('img').each(function () {
			var rNum = (Math.random() * 12) - 6,
				cssRotate = 'rotate(' + rNum + 'deg)',
				x;
			for (x = 0; x < styles.length; (x++)) {
				$(this).css(styles[x], cssRotate);
			}
		});

		return container;
	};

	my.onReady = function () {
		$('#article_section article').each(function () {
			my.imgRandomRotate($(this));
		});
	}

	$(function () {
		my.onReady();
	});

	return my;
});