/* global angular: false, $: false, test: false, ok: false, strictEqual: false */
(function() {
	module( "Directive scope attributes" );

	test( "Load and activate the first step", function() {
		var root = setup( "directive-loading", function( $scope ) {
			$scope.steps = [{
				position: 0
			}];
		});

		strictEqual( root.find( ".step" ).length, 1, "Should create a single step" );
		ok( root.find( ".step" ).hasClass( "active" ), "Should activate the first step" );
	});

	function setup( id, controller ) {
		var target = $( "#" + id );
		angular.module( "test", [ "impress" ] )
			.controller( "Controller", controller );
		angular.bootstrap( target[ 0 ], ["test"] );
		return target;
	}
}());
