requirejs.config({
	baseUrl: '/period_app/scripts/',
	paths: {
		hbs: 'vendors/hbs',
		backbone: 'vendors/backbone',
		Handlebars: 'vendors/handlebars',
		underscore: 'vendors/underscore',
		jquery: 'vendors/jquery-1.9.1',
		jquery_ui: 'vendors/jquery-ui-1.10.3.custom',
		i18nprecompile: 'vendors/i18nprecompile',
		json2: 'vendors/json2',
		localstorage: 'vendors/backbone.localStorage',
		highcharts: 'vendors/highcharts',
		datepicker: 'vendors/jquery-ui.multidatespicker'
	},
	hbs: {
		helpers: true,
		disableI18n: true,
		templateExtension: 'hbs',
		partialsUrl: '../../../../templates/'
	},
	shim: {
		'jquery_ui': {
			deps: ['jquery'],
		},
		'highcharts': {
			deps: ['jquery', 'underscore'],
			exports: 'Highcharts'
		},
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		}
	}
});
