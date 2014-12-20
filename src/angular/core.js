/* global angular: false, impress: false */
function ImpressDirective( $timeout ) {
	return {
		restrict: "A",
		scope: {
			step: "=impressStep",
			init: "&impressInit",
			stepEnter: "&impressStepEnter",
			stepLeave: "&impressStepLeave"
		},
		compile: function( element, attrs ) {
			return function( scope, element, attrs ) {
				var api = impress( element.attr( "id" ) );

				scope.$watch( "step", api.goto );

				element.on( "impress:init", function( event ) {
					$timeout(function() {
						var api = event.originalEvent.detail.api;
						if ( scope.init ) {
							scope.init({
								api: api
							});
						}
					});
				});

				element.find( ".step" ).on( "impress:stepenter", function() {
					$timeout(function() {
						if ( scope.stepEnter ) {
							scope.stepEnter();
						}
					});
				});

				element.find( ".step" ).on( "impress:stepleave", function() {
					$timeout(function() {
						if ( scope.stepLeave ) {
							scope.stepLeave();
						}
					});
				});

				api.init();
			};
		}
	};
}

angular.module( "impress", [] )
	.directive( [ "$timeout", ImpressDirective ] );
