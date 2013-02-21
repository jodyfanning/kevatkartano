"use strict";

if (!window) {
	//Creating a browser-like BOM/DOM/Window
	var jsdom = require('jsdom').jsdom;
	var document = jsdom('<html><body></body></html>');
	var window = document.createWindow();
	global.window = window;
	global.document = document;
	// create a jQuery instance
	var jQuery = require('jquery').create(window);
	global.jQuery = global.$ = jQuery;

	var jasminequery = require('jasmine-jquery');

	var q = require('q');
	var effects = require('../ajaxify.js');
	global.KEVATKARTANO = {};
	global.KEVATKARTANO.effects = effects;
}

describe("ajaxify module", function () {
	it ('should do something', function () {
		expect(false).not.toBe(true);;
	});
});