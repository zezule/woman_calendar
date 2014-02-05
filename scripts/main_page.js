
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

				var LogoutBox = Backbone.View.extend({
					render: function() {
						this.$el.append('<button id="user_logout" data-href="../login">Wyloguj</button>'); //do tpl i tłumaczenie
					},
					events: {
						'click': 'logout'
					},
					logout: function(event) {
						var link = $(event.target);
						$.ajax({
							type: "POST",
							url: '../login/signout',
							success: function(response) {
								if (response.STATUS === 'ok') {
									window.location.href = link.attr('data-href');
								}
							}
						});
					}
				});
				var logout_box = new LogoutBox({el: '#logout_box'});
				logout_box.render();
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





