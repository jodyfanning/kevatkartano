/*jshint browser: true, devel: true, eqeqeq: true, jquery: true */
/*global Q: true, KEVATKARTANO: true, exports: true, global: true, module: true */

(function (definition) {
	'use strict';
    // CommonJS
    if (typeof exports === "object") {
        module.exports = definition(global);
    // <script>
    } else {
		if (typeof KEVATKARTANO === 'undefined') {
			KEVATKARTANO = {};
		}
        KEVATKARTANO.ajaxify = definition(window);
    }
})(function (global, undefined) {
	'use strict';

	var my = {},
		history = global.history,
		$ = global.jQuery,
		Q = global.Q,
		window = global,
		document = global.document;

	my.supportsHistory = function () {
		return !!(history && history.pushState);
	};

	my.getArticleAsync = function (url) {
		var deferred = Q.defer();

		$.ajax({
			'url': url,
			'dataType': 'html'
		}).success(function (response) {
			deferred.resolve({'url': url, 'response': response});
		}).fail(function (xhr) {
			deferred.reject(new Error('Couldn\'t load article ' + url + ', reason: ' + xhr.statusText));
		});

		return deferred.promise;
	};

	my.findArticle = function (data) {
		var article = {},
			response = data.response,
			message,
			title = $(response).find('title').first().text(),
			body = $(response).find('article').first().html(),
			section = $(response).find('#article_section').first(),
			header = $(response).find('#content_header h1').first();
		if (body.length > 0) {
			article.url = data.url;
			article.title = title;
			article.body = body;
			article.next = $(section).find('.next').first().attr('href');
			article.previous = $(section).find('.previous').first().attr('href');
		} else {
			header = $(response).find('h1').first();
			if (header.length > 0) {
				message = ' in ' + header.text();
			}
			throw new Error('Couldn\'t parse article, no content found' + message);
		}
		return article;
	};

	my.appendArticle = function (article) {
		if (article.next) {
			$('#article_section .next').first().attr('href', article.next).show();
		} else {
			$('#article_section .next').first().attr('href', "").hide();
		}
		if (article.previous) {
			$('#article_section .previous').first().attr('href', article.previous).show();
		} else {
			$('#article_section .previous').first().attr('href', "").hide();
		}
		$('#article_section article').html(article.body);
		article.body = $('#article_section article');
		window.document.title = 'Kevätkartano - ' + $('#article_section article header h1').text();
		return article;
	};

	my.pushHistory = function (article) {
		history.pushState(article, article.title, article.url);
		return article;
	};

	my.replaceHistory = function (article) {
		history.replaceState(article, article.title, article.url);
		return article;
	};

	my.showError = function (error) {
		$('#errors').append($('<div>').text(error.message));
		return error;
	};

	my.logError = function (error) {
		console.log(error.message);
		return error;
	};

	my.onReady = function () {
		$(window).bind('popstate', function (event) {
			event = event || window.event;
			if (event.originalEvent.state) {
				Q.when(my.appendArticle(event.originalEvent.state))
					.then(parent.effects.imgRandomRotate)
					.fail(my.logError)
					.done();
			}
		});

		$('#article_section nav a').click(function (e) {
			my.getArticleAsync($(this).attr('href'))
				.then(my.findArticle)
				.then(my.pushHistory)
				.then(my.appendArticle)
				.then(parent.effects.imgRandomRotate)
				.fail(my.logError)
				.done();
			e.preventDefault();
			return false;
		});

		Q.when(my.replaceHistory({
			body: $('#article_section article').first().html(),
			next: $('#article_section nav .next').first().attr('href'),
			previous: $('#article_section nav .previous').first().attr('href'),
			title: document.title,
			url: (history.location || document.location).href
		})).fail(my.logError).done();
	};

	$(function () {
		//Don't register anything if history isn't supported
		if (!my.supportsHistory()) {
			return;
		}

		my.onReady();
	});

	return my;
});