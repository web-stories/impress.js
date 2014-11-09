module.exports = function( grunt ) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),
		jscs: {
			files: [
				"Gruntfile.js",
				"src/**/*.js"
			]
		},
		jshint: {
			files: [
				"Gruntfile.js",
				"src/**/*.js"
			],
			options: {
				jshintrc: true
			}
		},
		concat: {
			options: {
				banner: grunt.file.read( "src/banner/banner.js" ),
				footer: grunt.file.read( "src/banner/footer.js" )
			},
			core: {
				files: {
					"dist/<%= pkg.name %>-<%= pkg.version %>.js": [ "src/js/core.js" ],
				}
			},
			all: {
				files: {
					"dist/<%= pkg.name %>.all-<%= pkg.version %>.js": [
						"src/js/core.js",
						"src/js/navigation.js"
					]
				}
			}
		}
	});

	// Load grunt tasks from NPM packages
	require( "load-grunt-tasks" )( grunt );

	// Main tasks
	grunt.registerTask( "files", [ "concat" ] );
	grunt.registerTask( "validate", [ "jscs", "jshint" ] );
};
