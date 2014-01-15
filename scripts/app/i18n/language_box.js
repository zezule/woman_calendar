define(['underscore', 'backbone', 'hbs!template/language_box'],
	function(_, Backbone, LanguageBoxTpl) {
		var LanguageBox = Backbone.View.extend({
			languages: [],
			current_language: null,
			events: {
				'click button': 'switch_language'
			},
			set_languages: function(languages) {
				_.isArray(languages) || (languages = []);
				this.languages = languages;
			},
			set_current_language: function(language) {
				this.current_language = language;
			},
			get_language_view_prop: function() {
				var view_prop = {};
				_.each(this.languages, function(language_code) {
					view_prop[language_code] = {};
					if (language_code === this.current_language) {
						view_prop[language_code] = {
							'class': 'active'
						};
					}
				}, this);
				return view_prop;
			},
			render: function() {
				this.$el.append(LanguageBoxTpl({
					'languages': this.get_language_view_prop()
				}));
			},
			switch_language: function(event) {
				var language_button = $(event.target);
				var current_language = this.model.get_language();
				if (current_language !== language_button.attr('data-lang-code')) {
					this.model.set('language', language_button.attr('data-lang-code'));
					this.model.save();
					window.location.reload();
				}
			}
		});
		return LanguageBox;
	});

