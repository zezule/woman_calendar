define(['app/constant', 'underscore', 'jquery', 'jquery_ui'],
	function(Constant, _, $) {
		var Validators = function() {
		};
		Validators.prototype.is_empty = function(value) {
			return value === null || value === '';
		};
		Validators.prototype.is_valid_date = function(str_date) {
			try {
				$.datepicker.parseDate(Constant.DATE_FORMAT, str_date);
			} catch (e) {
				return false;
			}
			return true;
		};
		Validators.prototype.is_valid_timestamp = function(timestamp) {
			return _.isDate(new Date(timestamp));
		};
		Validators.prototype.get_valid_date = function(str_date) {
			return (this.is_valid_timestamp(str_date) === true) ? new Date(str_date) : false;
		};
		return new Validators();
	}
);