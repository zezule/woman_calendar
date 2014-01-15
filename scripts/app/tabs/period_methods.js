define(['app/tabs/period_entry_model', 'app/constant', 'underscore'], function(PeriodEntryModel, Constant, _) {

	var PeriodMethods = function() {
		this.default_period_length = 5;
		this.number_of_significant_entries = 12;
	};
	PeriodMethods.prototype.trim_source = function(source) {
		if (source.length > this.number_of_significant_entries) {
			source = _.rest(source, source.length - this.number_of_significant_entries);
		}
		return source;
	};
	PeriodMethods.prototype.get_next_period = function(source) {
		var gap = this.calculate_cycle_length(source);
		var length = this.calculate_period_length(source);
		var last_period = _.last(source);
		var start_date = this.calculate_cycle_begin_date(gap, last_period.get_start_date());
		return new PeriodEntryModel({
			'start_date': start_date,
			'end_date': start_date + length * Constant.DAY,
			'length': length,
			'period_gap': gap
		});
	};
	PeriodMethods.prototype.calculate_cycle_length = function(source) {
		var source = this.trim_source(source);
		return Math.ceil(_.reduce(source, function(memo, model) {
			return memo + model.get_period_gap();
		}, 0) / source.length);
	};
	PeriodMethods.prototype.calculate_period_length = function(source) {
		var source = this.trim_source(source);
		var full_entries = 0;
		var length = _.reduce(source, function(memo, model) {
			if (_.isNull(model.get_length()) === false) {
				full_entries++;
				return memo + model.get_length();
			}
		}, 0);
		if (full_entries > 0) {
			return  Math.ceil(length / full_entries);
		}
		return this.default_period_length;
	};
	PeriodMethods.prototype.get_today = function() {
		var today = new Date();
		today.setHours(0, 0, 0);
		return today;
	};
	PeriodMethods.prototype.get_date = function(timestamp) {
		var date = new Date(timestamp * 1000);
		date.setHours(0, 0, 0);
		return date;
	};

	PeriodMethods.prototype.calculate_cycle_begin_date = function(gap, last_period_timestamp) {
		var today = this.get_today().getTime() / 1000 - (gap * Constant.DAY);
		while (last_period_timestamp < today) {
			last_period_timestamp += gap * Constant.DAY;
		}
		return last_period_timestamp + gap * Constant.DAY;
	};
	PeriodMethods.prototype.estimate = function(months_ahead, source) {
		var estimation = [];
		var source = this.trim_source(source);
		for (var i = 0; i < months_ahead; i++) {
			var next = this.get_next_period(source);
			source.push(next);
			estimation.push(next);
			source = _.rest(source);
		}
		return estimation;
	};
	return new PeriodMethods();
});