/* global assert: false, test: false, ok: false, strictEqual: false, impress: false */

module( "Constructor" );

test( "Should accept id as string", function() {
	var element = document.getElementById( "elementId" );
	impress( "elementId" ).init();

	ok( !!element.getAttribute( "style" ), "Impress should be initialized on the element" );
});

test( "Should default to 'impress' id", function() {
	var element = document.getElementById( "impress" );
	impress().init();

	ok( !!element.getAttribute( "style" ), "Impress should be initialized on the element" );
});

test( "Should accept a custom DOM element", function() {
	var element = document.getElementById( "customElement" );
	impress( element ).init();

	ok( !!element.getAttribute( "style" ), "Impress should be initialized on the element" );
});

module( "API", {
	setup: function() {
		// Ensures the body is clean for each test
		document.body.className = "";
	}
});

test( "Should enable custom support condition", function() {
	var element = document.getElementById( "customSupport" );
	var api = impress( element );

	api.support(function() {
		return false;
	});
	api.init();

	strictEqual(
		document.body.className,
		"impress-not-supported impress-enabled",
		"Should mark impress as not supported"
	);
});
