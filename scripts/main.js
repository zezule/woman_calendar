requirejs.config({
	baseUrl: '../scripts',
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

require(['app/i18n/language_model', 'backbone', 'jquery_ui', 'jquery'],
	function(LanguageModel, Backbone) {
		var language = LanguageModel.get_language();
		Backbone.emulateJSON = true;
		require([
			'app/i18n/' + language,
			'app/i18n/translator',
			'app/tabs/chart_tab',
			'app/tabs/pregnancy_tab',
			'app/tabs/estimation_tab',
			'app/tabs/statistics_tab',
			'app/tabs/tab_manager',
			'app/i18n/language_box',
			'app/i18n/datepicker-' + language
		],
			function(LanguageMapping, Translator, ChartTab, PregnancyTab, EstimationTab, StatisticsTab, TabManager, LanguageBox) {

				Translator.set_mapper(LanguageMapping);
				window.Translator = Translator;
				var language_box = new LanguageBox({el: '#language_box', model: LanguageModel});
				language_box.set_languages(Translator.supported_languages);
				language_box.set_current_language(language);
				language_box.render();

				var main_tab_manager = new TabManager({el: '#main_menu_elements'});
				main_tab_manager.add(new ChartTab({el: '#chart_tab_content'}));
				main_tab_manager.add(new PregnancyTab({el: '#pregnency_tab_content'}));
				main_tab_manager.add(new EstimationTab({el: '#estimation_tab_content'}));
				//	main_tab_manager.add(new StatisticsTab({el: '#statistics_tab_content'}));
				main_tab_manager.run();

			}
		);
	}
);














