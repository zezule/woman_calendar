define([
	'app/validator',
	'jquery',
	'underscore',
	'backbone',
	'jquery_ui'
],
	function(Validator, $, _, Backbone) {
		var PeriodEntryModel = Backbone.Model.extend({
			url: function() {
				return 'period/entry/' + encodeURIComponent(this.get('id') || '');
			},
			idAttribute: 'id',
			defaults: {
				'id': null,
				'start_date': null,
				'end_date': null
			},
			validate: function(attributes) {
				_.isNumber(attributes.start_date) || (attributes.start_date = 0);
				var start_date = attributes.start_date * 1000;
				var end_date = attributes.end_date;

				if (Validator.is_valid_timestamp(start_date) === false) {
					return new Error('invalid_start_date');
				}
				//Start Date is Valid
				if (false === Validator.is_empty(end_date)) {
					//End Date is supplied
					var end_date = Validator.get_valid_date(end_date * 1000);
					if (end_date !== false) {
						//End Date is valid
						if (end_date - Validator.get_valid_date(start_date) < 0) {
							return new Error('invaild_date_range');
						}
					} else {
						return new Error('invalid_end_date');
					}
				}
			},
			get_end_date: function() {
				return parseInt(this.get('end_date'));
			},
			get_start_date: function() {
				return parseInt(this.get('start_date'));
			},
			get_period_gap: function() {
				return parseInt(this.get('period_gap'));
			},
			get_length: function() {
				var length = this.get('end_date');
				if (true === _.isNumber(length)) {
					length = parseInt(length);
				}
				return null;
			}
		});
		return PeriodEntryModel;
	});

