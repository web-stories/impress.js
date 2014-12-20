/**
 * impress.js
 *
 * impress.js is a presentation tool based on the power of CSS3 transforms and transitions
 * in modern browsers and inspired by the idea behind prezi.com.
 *
 *
 * Copyright 2011-<%= grunt.template.today("yyyy") %> Bartek Szopka (@bartaz)
 *
 * Released under the MIT and GPL Licenses.
 *
 * ------------------------------------------------
 * author: Bartek Szopka
 * version: <%= pkg.version %>
 * url: http://bartaz.github.com/impress.js/
 * source: http://github.com/bartaz/impress.js/
 */

(function( factory, document, window ) {
	if ( typeof define === "function" && define.amd ) {
		define( [ "angular" ], factory );
	} else {
		factory( window.angular );
	}
}(function( angular ) {
	"use strict";
