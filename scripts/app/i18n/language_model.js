define(['backbone', 'localstorage'],
	function(Backbone) {
		var LanguageModel = Backbone.Model.extend({
			id: 1,
			storage_name: 'current_language',
			default_lang: 'pl',
			default: {
				language: 'pl'
			},
			localStorage: null,
			constructor: function() {
				Backbone.Model.apply(this, arguments);
				this.localStorage = new Backbone.LocalStorage(this.storage_name);
			},
			get_storage_key: function() {
				return this.storage_name + '-' + this.id;
			},
			get_language: function() {
				var storage = this.localStorage.localStorage();

				if (storage.hasOwnProperty(this.get_storage_key())) {
					var language_config = JSON.parse(storage[this.get_storage_key()]);
					return language_config.language || this.default_lang;
				}
				return this.default_lang;
			}
		});
		return new LanguageModel();
	});