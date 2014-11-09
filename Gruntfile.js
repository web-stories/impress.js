module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		jscs: {
			files: [
				"Gruntfile.js",
				"src/**/*.js"
			]
		}
	});

	// Load grunt tasks from NPM packages
	require( "load-grunt-tasks" )( grunt );

	// Main tasks
	grunt.registerTask( "validate", ["jscs"] );
};
