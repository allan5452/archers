module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				autoWatch: true
			}
		},
		requirejs: {
			compile: {
				options: {
					name: "archers",
					baseUrl: "src/",
					paths: {
						'lib': '../lib'
					},
					mainConfigFile: "src/archers.js",
					out: "js/archers.js"
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('build', ['requirejs']);
	grunt.registerTask('test', ['karma']);
};