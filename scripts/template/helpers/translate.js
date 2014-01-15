define(['Handlebars'], function(Handlebars) {

	function translate(foreign_word) {
		return window.Translator.translate(foreign_word);
	}

	Handlebars.registerHelper("translate", translate);
	return translate;

});

