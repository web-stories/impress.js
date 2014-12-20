module.exports = function( grunt ) {
	"use strict";

	var validateFiles = [
		"Gruntfile.js",

		"src/angular/**/*.js",
		"!src/angular/intro.js",
		"!src/angular/outro.js",

		"src/js/**/*.js",
		"!src/js/intro.js",
		"!src/js/outro.js",

		"test/**/*.js",
		"!test/vendor/**/*.js"
	];

	var configs = {
		pkg: grunt.file.readJSON( "bower.json" ),
		jscs: {
			files: validateFiles
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
			files: validateFiles
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
			core: {
				options: {
					banner: grunt.file.read( "src/js/intro.js" ),
					footer: grunt.file.read( "src/js/outro.js" )
				},
				files: {
					"dist/<%= pkg.name %>-<%= pkg.version %>.js": [ "src/js/core.js" ]
				}
			},
			all: {
				options: {
					banner: grunt.file.read( "src/js/intro.js" ),
					footer: grunt.file.read( "src/js/outro.js" )
				},
				files: {
					"dist/<%= pkg.name %>.all-<%= pkg.version %>.js": [
						"src/js/core.js",
						"src/js/navigation.js"
					]
				}
			},
			angularCore: {
				options: {
					banner: grunt.file.read( "src/angular/intro.js" ),
					footer: grunt.file.read( "src/angular/outro.js" )
				},
				files: {
					"dist/angular-<%= pkg.name %>-<%= pkg.version %>.js": [
						"src/js/core.js",
						"src/angular/core.js"
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
						"http://localhost:8000/test/api/index.html?version=<%= pkg.version %>",
						"http://localhost:8000/test/angular/index.html?version=<%= pkg.version %>"
					]
				}
			}
		},
		watch: {
			files: [
				"src/**/*.*",
				"test/**/*.*"
			],
			tasks: [ "validate", "files" ]
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
	grunt.registerTask( "dev", [ "validate", "files", "connect", "watch" ] );
	grunt.registerTask( "pages", [ "default", "gh-pages" ] );
};
