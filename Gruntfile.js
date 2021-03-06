module.exports = function( grunt ) {

	"use strict";

	var configs = {
		pkg: grunt.file.readJSON( "bower.json" ),
		jscs: {
			files: [
				"Gruntfile.js",
				"src/js/**/*.js",
				"test/**/*.js",
				"!test/vendor/**/*.js"
			]
		},
		jshint: {
			options: {
				"node": true,
				"browser": true,
				"bitwise": true,
				"forin": true,
				"latedef": true,
				"newcap": true,
				"noarg": true,
				"noempty": true,
				"undef": true
			},
			files: [
				"Gruntfile.js",
				"src/js/**/*.js",
				"test/**/*.js",
				"!test/vendor/**/*.js"
			]
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
		},
		connect: {
			all: {}
		},
		qunit: {
			all: {
				options: {
					urls: [
						"http://localhost:8000/test/amd/requireJS.html?version=<%= pkg.version %>",
						"http://localhost:8000/test/api/index.html?version=<%= pkg.version %>"
					]
				}
			}
		}
	};

	grunt.initConfig( configs );

	// Load grunt tasks from NPM packages
	require( "load-grunt-tasks" )( grunt );

	// Main tasks
	grunt.registerTask( "test", [ "connect", "qunit" ] );
	grunt.registerTask( "files", [ "concat", "copy" ] );
	grunt.registerTask( "validate", [ "jscs", "jshint" ] );

	// Special tasks
	grunt.registerTask( "default", [ "validate", "files", "test" ] );
	grunt.registerTask( "pages", [ "default", "gh-pages" ] );
};
