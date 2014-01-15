define([
	'app/validator',
	'app/constant',
	'app/boxes/box',
	'hbs!template/period_form',
	'hbs!template/error_msg_tpl',
	'jquery',
	'underscore'
],
	function(Validator, Constant, Box, PeriodFormTpl, error_msg_tpl, $, _) {
		var PeriodFormBox = Box.extend({
			id: 'period_insertion_box',
			$dialog: null,
			$error_box: null,
			events: {
				"click button": 'show_form'
			},
			show_form: function() {
				this.$error_box.empty();
				this.$dialog.dialog({
					height: 300,
					width: 400,
					modal: true,
					buttons: {
						"submit information": _.bind(function() {
							if (false !== this.save()) {
								this.$dialog.dialog("close");
							}
						}, this),
						"cancel": function() {
							$(this).dialog("close");
						}
					}
				});
			},
			build: function() {
				var today = new Date();
				var start_date = this.$el.find("#period_start_date");
				var end_date = this.$el.find("#period_end_date");
				start_date.datepicker({
					showOn: "button",
					numberOfMonths: 1,
					maxDate: today,
					onClose: function(selectedDate) {
						if (Validator.is_valid_date(selectedDate) === true) {
							end_date.datepicker("option", "minDate", selectedDate);
						}
					}
				});
				end_date.datepicker({
					showOn: "button",
					numberOfMonths: 1,
					maxDate: today,
					onClose: function(selectedDate) {
						if (Validator.is_valid_date(selectedDate) === true) {
							start_date.datepicker("option", "maxDate", selectedDate);
						}
					}
				});
				start_date.change(_.bind(function() {
					this._change_input_to_default(start_date, 'period_form_insert_start_date');
				}, this));
				end_date.change(_.bind(function() {
					this._change_input_to_default(end_date, 'period_form_insert_end_date');
				}, this));
			},
			_change_input_to_default: function(element, default_value) {
				if (false === Validator.is_valid_date(element.val())) {
					element.val(window.Translator.translate(default_value));
				}
			},
			save: function() {
				var start_date = $('#period_start_date').val();
				var end_date = $('#period_end_date').val();
				if (end_date === window.Translator.translate('period_form_insert_end_date') || Validator.is_empty(end_date)) {
					end_date = null;
				} else {
					end_date = ($.datepicker.parseDate(Constant.DATE_FORMAT, end_date)).getTime() / 1000;
				}
				return this.model.create({
					'start_date': ($.datepicker.parseDate(Constant.DATE_FORMAT, start_date)).getTime() / 1000,
					'end_date': end_date
				}, {'wait': true, 'validate': true});
			},
			handle_invalid_data: function(invalid_model, ignore, object) {
				this.$error_box.append(error_msg_tpl({
					message: window.Translator.translate(object.validationError.message)
				}));
			},
			render: function() {
				this.$el.append(PeriodFormTpl());
				this.$dialog = $(this.$el.find('#period_insertion_popup'));
				this.$error_box = $(this.$el.find('#period_insertion_error_box'));
				this.build();
				this.listenTo(this.model, 'invalid', this.handle_invalid_data);
			}
		});
		return PeriodFormBox;
	});