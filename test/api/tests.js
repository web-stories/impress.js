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