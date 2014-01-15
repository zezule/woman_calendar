define([
	'app/constant',
	'app/tabs/period_methods',
	'app/tabs/chart_tab_data',
	'app/boxes/box',
	'jquery',
	'underscore'
],
	function(Constant, PeriodMethods, DataCollection, Box, $, _) {
		var YourPeriodBox = Box.extend({
			id: 'your_period_box',
			required_entry_no: 2,
			render: function() {
				this.$el.append(this.get_list());
			},
			get_list: function() {
				var ul = $('<ul>');

				if (this.model.length < this.required_entry_no) {
					return null;
				}
				var source = new DataCollection(this.model.toJSON());
				var cycle_day = this.get_cycle_day(source.models);
				var cycle_length = PeriodMethods.calculate_cycle_length(this.model.models);
				ul.append(this.decoreate_text('your_period_day_in_cycle', {
					'%x': cycle_day,
					'%s': window.Translator.translate_numeral_suffix(cycle_day)
				}));

				ul.append(this.decoreate_text('your_period_cycle_length', {
					'%x': PeriodMethods.calculate_cycle_length(this.model.models),
					'%s': window.Translator.translate_numeral_suffix(cycle_day)
				}));

				ul.append(this.decoreate_text('your_period_naxt_in_days', {
					'%x': Math.ceil(cycle_length - cycle_day),
					'%s': window.Translator.translate_numeral_suffix(cycle_day)
				}));
				return ul;
			},
			decoreate_text: function(translation_code, replacement) {
				var tmp = $('<li>');
				var translation = window.Translator.translate(translation_code);
				_.each(replacement, function(replace_search, replacement) {
					translation = translation.replace(replacement, replace_search);
				});
				tmp.append(translation);
				return tmp;
			},
			get_cycle_day: function(source) {
				var estimation = PeriodMethods.estimate(1, source)[0];
				var today_timestamp = PeriodMethods.get_today().getTime() / 1000;
				var cycle_length = PeriodMethods.calculate_cycle_length(source);
				var day_difference = (today_timestamp - estimation.get_start_date()) / (Constant.DAY);
				var result = Math.ceil(cycle_length + day_difference);
				return (result === 0) ? 1 : result;
			}
		});
		return YourPeriodBox;
	});

