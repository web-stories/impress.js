module.exports = function( grunt ) {
	"use strict";

	var configs = {
		pkg: grunt.file.readJSON( "bower.json" ),
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
				"node": true
			}
		},
		copy: {
			demo: {
				options: {
					process: function( content ) {
						return grunt.template.process( content, configs );
					}
				},
				expand: true,
				cwd: "gh-pages/",
				src: "**/*.*",
				dest: "dist/"
			}
		},
		concat: {
			options: {
				banner: grunt.file.read( "src/partial/intro.js" ),
				footer: grunt.file.read( "src/partial/outro.js" )
			},
			core: {
				files: {
					"dist/<%= pkg.name %>-<%= pkg.version %>.js": [ "src/js/core.js" ]
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
		},
		"gh-pages": {
			options: {
				base: "dist"
			},
			src: [ "**/*.*" ]
		}
	};

	grunt.initConfig( configs );

	// Load grunt tasks from NPM packages
	require( "load-grunt-tasks" )( grunt );

	// Main tasks
	grunt.registerTask( "files", [ "concat", "copy" ] );
	grunt.registerTask( "validate", [ "jscs", "jshint" ] );

	// Special tasks
	grunt.registerTask( "default", [ "validate", "files", "gh-pages" ] );
};
