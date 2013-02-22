"use strict";
var jsdom = require('jsdom');

//Creating a browser-like BOM/DOM/Window
var document = jsdom.jsdom('<html><body></body></html>');
var window = document.createWindow();

//Be Firefox
window.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:19.0) Gecko/20100101 Firefox/19.0'};
window.history = {
	pushState: function () {},
	popState: function () {}
}
global.window = window;
global.document = document;

// create a jQuery instance
var jQuery = require('jquery').create(window);
global.jQuery = global.$ = jQuery;

var KEVATKARTANO = {};

//Depends on Q module
global.Q = require('q');

var ajaxify = require('../ajaxify.js');
KEVATKARTANO.ajaxify = ajaxify;

describe("ajaxify module", function () {
	describe ('is created and configured', function () {
		it ('should be defined', function () {
			expect(KEVATKARTANO.ajaxify).not.toBeUndefined();
		});

		it ('should have a method findArticle()', function () {
			expect(typeof KEVATKARTANO.ajaxify.findArticle).toEqual('function');
		});

		it ('should have a method onReady()', function () {
			expect(typeof KEVATKARTANO.ajaxify.onReady).toEqual('function');
		});
	});

});