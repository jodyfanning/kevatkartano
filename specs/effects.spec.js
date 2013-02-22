"use strict";
var jsdom = require('jsdom');

//Creating a browser-like BOM/DOM/Window
var document = jsdom.jsdom('<html><body></body></html>');
var window = document.createWindow();

//Be Firefox
window.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:19.0) Gecko/20100101 Firefox/19.0'};
global.window = window;
global.document = document;

// create a jQuery instance
var jQuery = require('jquery').create(window);
global.jQuery = global.$ = jQuery;

var KEVATKARTANO = {};

KEVATKARTANO.effects = require('../effects.js');

require('jasmine-jquery');

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
		beforeEach(function () {
			jasmine.getFixtures().set('<section id="article_section"><article><img src="#"></img></article></section>');
		});	

		it ('by using jQuery find with img', function () {
			var find = spyOn(jQuery.fn, 'find').andCallThrough();
			var modified = KEVATKARTANO.effects.imgRandomRotate($('article'));
			expect(find).toHaveBeenCalledWith('img');
		});

		it ('by setting rotate with jQuery css on an image', function () {
			var css = spyOn(jQuery.fn, 'css').andCallThrough();
			var modified = KEVATKARTANO.effects.imgRandomRotate($('article'));
			expect(css).toHaveBeenCalled();
		});

		it ('when page is first loaded', function () {
			var bob = spyOn(KEVATKARTANO.effects, 'imgRandomRotate');
			KEVATKARTANO.effects.onReady();
			expect(bob).toHaveBeenCalled();
		})
	});

});