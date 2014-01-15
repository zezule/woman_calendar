define([
	'app/constant',
	'app/boxes/box',
	'underscore',
	'jquery',
	'hbs!template/period_statistic',
	'jquery_ui'
],
	function(Constant, Box, _, $, PeriodStatisticTpl) {
		var PeriodStatisticBox = Box.extend({
			entry_treshold: 2, //Number of entries in order to proceed with statistic box
			render: function() {
				this.$el.empty();
				this.$el.append(
					PeriodStatisticTpl(
						_.extend(
							this.calculate_extreme_period_length(),
							this.calculate_extreme_period_gap()
							)
						)
					);
			},
			_get_not_enught_object: function(result_keys) {
				var result = {};
				_.each(result_keys, function(key_name) {
					result[key_name] = window.Translator.translate('not_enough_data');
				});
				return result;
			},
			_format_date: function(timestamp) {
				return $.datepicker.formatDate(Constant.DATE_FORMAT, new Date(timestamp));
			},
			calculate_extreme_period_length: function() {
				if (this.model.length < this.entry_treshold) {
					return this._get_not_enught_object([
						'longest_period_length',
						'longest_period_start_date',
						'shortest_period_length',
						'shortest_period_start_date'
					]);
				}
				var data = _.chain(this.model.models)
					.reject(function(model) {
						return _.isNaN(model.get_length());
					})
					.sortBy(function(model) {
						return model.get_length();
					})
					.value();
				var longest = _.last(data);
				var shortest = _.first(data);
				return {
					'longest_period_length': longest.get_length(),
					'longest_period_start_date': this._format_date(longest.get_start_date()),
					'shortest_period_length': shortest.get_length(),
					'shortest_period_start_date': this._format_date(shortest.get_start_date())
				};
			},
			calculate_extreme_period_gap: function() {
				var data = _.rest(this.model.models);
				if (data.length < this.entry_treshold) {
					return this._get_not_enught_object([
						'longest_gap_length',
						'shortest_gap_length'
					]);
				}
				data = _.sortBy(data, function(model) {
					return model.get_period_gap();
				});
				var longest = _.last(data);
				var shortest = _.first(data);
				return {
					'longest_gap_length': longest.get_period_gap(),
					'shortest_gap_length': shortest.get_period_gap()
				};
			}
		});
		return PeriodStatisticBox;
	}
);

