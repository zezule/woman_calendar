
require(['app/i18n/language_model', 'backbone', 'jquery_ui', 'jquery'],
	function(LanguageModel, Backbone) {
		var language = LanguageModel.get_language();
		Backbone.emulateJSON = true;
		require([
			'app/i18n/' + language,
			'app/i18n/translator',
			'app/i18n/language_box',
			'app/boxes/login_box',
			'app/boxes/register_box'
		],
			function(LanguageMapping, Translator, LanguageBox, LoginBox, RegisterBox) {
				Translator.set_mapper(LanguageMapping);
				window.Translator = Translator;
				var language_box = new LanguageBox({el: '#language_box', model: LanguageModel});
				language_box.set_languages(Translator.supported_languages);
				language_box.set_current_language(language);
				language_box.render();

				var login_box = new LoginBox({el: '#login_box'});
				login_box.render();

				//	var register_box = new RegisterBox();
				//register_box.render();
			}
		);
	}
);





