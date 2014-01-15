define([
	'hbs!template/estimation_box',
	'app/constant',
	'app/boxes/box',
	'app/tabs/chart_tab_data',
	'app/tabs/period_methods',
	'jquery',
	'underscore',
	'jquery_ui',
	'datepicker'
],
	function(estimation_tpl, Constant, Box, DataCollection, PeriodMethods, $, _) {

		var FuturePeriodEstimation = Box.extend({
			className: 'iz_multiple_calendars',
			id: 'period_estimation_calendars',
			months_ahead: 8, //estimation for 8 months
			calendar_row_no: 2,
			calendar_col_no: 3,
			estimation: [],
			render: function() {
				this.$el.append(estimation_tpl());
				this.draw_calendars();
			},
			draw_calendars: function() {
				var collection = new DataCollection(this.model.toJSON());
				this.estimation = PeriodMethods.estimate(this.months_ahead, collection.models);
				var dates = [];

				_.each(this.estimation, function(estimation_model) {
					var start_date = estimation_model.get_start_date();
					var end_date = estimation_model.get_end_date();
					do {
						dates.push(new Date(1000 * start_date));
						start_date += Constant.DAY;
					} while (start_date < end_date);
					dates.push(new Date(1000 * end_date));
				});
				var first_estimation = _.first(this.estimation);
				this.$el.find('div').multiDatesPicker({
					'addDates': dates,
					defaultDate: new Date(first_estimation.get_start_date() * 1000),
					'numberOfMonths': [this.calendar_row_no, this.calendar_col_no],
					'disabled': true
				});
			}
		});
		return FuturePeriodEstimation;
	});