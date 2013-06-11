var tests = Object.keys(window.__karma__.files).filter(function (file) {
	return /Spec\.js$/.test(file);
});
console.log(tests);

requirejs.config({
	// Karma serves files from '/base'
	baseUrl: '/base/src',

	paths: {
		'lib': '/base/lib',
		'test': '/base/test'
	},
	// shim: {},

	// ask Require.js to load these files (all our tests)
	deps: tests,

	// start test run, once Require.js is done
	callback: window.__karma__.start
});