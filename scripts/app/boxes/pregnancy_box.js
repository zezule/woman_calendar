define([
	'hbs!template/fertile_days_box',
	'app/constant',
	'app/boxes/box',
	'app/tabs/period_methods',
	'jquery',
	'underscore',
	'jquery_ui',
	'datepicker'
],
	function(fertile_box_tpl, Constant, Box, PeriodMethods, $, _) {
		// Wyswietlic info:  If your cycle is greater than 35 days, or less than 25 days, you may not be ovulating. Please consult your doctor.

		var PregnancyDaysBox = Box.extend({
			id: 'pregnancy_days_box',
			className: 'iz_multiple_calendars',
			pragnancy_days_length: 6,
			months_ahead: 3, //estimation for 12 months
			days_before_ovulation: 3, //number of days before owulation when fertile days starts
			calendar_row_no: 1,
			calendar_col_no: 3,
			fertile_days: [],
			ovulation_days: [],
			render: function() {
				var cycle_length = PeriodMethods.calculate_cycle_length(this.model.models);
				this.calculate_fertile_days(_.last(this.model.models), cycle_length);
				this.$el.append(fertile_box_tpl());
				this.draw_calendars();
			},
			calculate_fertile_days: function(last_period, cycle_length) {
				var pregnancy_cycle_day = this.calculate_pregnancy_cycle_day(cycle_length);
				var cycle_begin_day = PeriodMethods.calculate_cycle_begin_date(cycle_length, last_period.get_start_date());
				cycle_begin_day = cycle_begin_day - (Constant.DAY * cycle_length);
				for (var i = 0; i < this.months_ahead; i++) {
					var start = cycle_begin_day + (Constant.DAY * pregnancy_cycle_day);
					this.ovulation_days.push(PeriodMethods.get_date(start));
					for (var j = -this.days_before_ovulation; j < this.pragnancy_days_length - this.days_before_ovulation; j++) {
						this.fertile_days.push(PeriodMethods.get_date(start + (j * Constant.DAY)));
					}
					cycle_begin_day += (Constant.DAY * cycle_length);
				}
			},
			/**
			 * http://dniplodne.org/
			 * @param {int} cycle_length
			 * @returns int
			 */
			calculate_pregnancy_cycle_day: function(cycle_length) {
				return 10 + (cycle_length - 26);
			},
			draw_calendars: function() {
				var first_estimation = _.first(this.fertile_days);
				var ovulation = this.ovulation_days;
				var fertile_days = this.fertile_days;

				this.$el.find('div').multiDatesPicker({
					'defaultDate': first_estimation,
					'numberOfMonths': [this.calendar_row_no, this.calendar_col_no],
					'disabled': true,
					beforeShowDay: function(date) {
						var class_name = '';
						var selected_date = PeriodMethods.get_date(date.getTime() / 1000);
						var findex = _.each(fertile_days, function(fdate, findex) {
							if (fdate.getTime() === selected_date.getTime()) {
								class_name = 'fertile_day';
								return findex;
							}
						});
						if (findex > 0) {
							fertile_days.splice(findex, 1);
							return [false, class_name];
						}
						var oindex = _.each(ovulation, function(odate, oindex) {
							if (odate.getTime() === selected_date.getTime()) {
								class_name = 'ovulation_day';
								return oindex;
							}
						});

						if (oindex > 0) {
							ovulation.splice(findex, 1);
							return [false, class_name];
						}
						return [false, class_name];
					}
				});
			}
		});
		return PregnancyDaysBox;
	});

