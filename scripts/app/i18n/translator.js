define([],
	function() {
		var Translator = function() {
			this.supported_languages = ['en', 'pl'];
			this.mapper = {};
		};
		Translator.prototype.set_mapper = function(mapper) {
			this.mapper = mapper;
		};
		Translator.prototype.translate = function(foreign_word) {
			if (this.mapper.hasOwnProperty(foreign_word)) {
				return this.mapper[foreign_word];
			}
			console.warn('[Warning] Missing transaltion for : ' + foreign_word);
			return foreign_word;
		};
		Translator.prototype.translate_numeral_suffix = function(number) {
			var str = number.toString();
			number = parseInt(str[str.length - 1]);
			number > 3 && (number = 'other');
			return this.mapper['numeral_suffix_' + number];
		};
		return new Translator();
	});


