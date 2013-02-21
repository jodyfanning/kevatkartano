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
	
	var effects = require('../effects.js');
	global.KEVATKARTANO = {};
	global.KEVATKARTANO.effects = effects;
}

describe ('effects module', function () {

	describe ('is created and configured', function () {
		it ('should be defined', function () {
			expect(KEVATKARTANO.effects).not.toBeUndefined();
		});

		it ('should have a method imgRandomRotate()', function () {
			expect(typeof KEVATKARTANO.effects.imgRandomRotate).toEqual('function');
		});

		it ('should have a method onReady()', function () {
			expect(typeof KEVATKARTANO.effects.onReady).toEqual('function');
		});
	});

	describe ('should rotate images', function () {
		beforeEach(function() {
			jasmine.getFixtures().set('<section id="article_section"><article><img src="#"></img></article></section>');
		});	

		it ('by using jQuery find with img', function () {
			var find = spyOn($.fn, 'find').andCallThrough();
			var modified = KEVATKARTANO.effects.imgRandomRotate($('article'));
			expect(find).toHaveBeenCalledWith('img');
		});

		it ('by setting rotate with jQuery css on an image', function () {
			var css = spyOn($.fn, 'css').andCallThrough();
			var modified = KEVATKARTANO.effects.imgRandomRotate($('article'));
			expect(css.mostRecentCall.args[0]).toEqual('transform');
			expect(css.mostRecentCall.args[1]).toMatch(/^rotate\([-.0-9]*deg\)/);
		});

		it ('when page is first loaded', function () {
			var css = spyOn(KEVATKARTANO.effects, 'imgRandomRotate').andCallThrough();
			KEVATKARTANO.effects.onReady();
			expect(KEVATKARTANO.effects.imgRandomRotate).toHaveBeenCalled();
		})
	});

});