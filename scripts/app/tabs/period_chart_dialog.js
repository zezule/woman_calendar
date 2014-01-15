define(['hbs!template/period_chart_dialog', 'app/constant', 'backbone', 'jquery', 'jquery_ui'],
	function(PeriodChartDialogTpl, Constant, Backbone, $) {
		var PeriodChartDialog = Backbone.View.extend({
			tagName: 'div',
			id: 'period_chart_dialog',
			current_point: {},
			constructor: function() {
				Backbone.View.apply(this, arguments);
				this.render();
			},
			set_current_point: function(point) {
				this.current_point = this.model.get(point.id);
			},
			render: function() {
				this.$el.attr('title', window.Translator.translate('chart_box_dialog_title'));
				this.$el.append(PeriodChartDialogTpl());
				this.$el.dialog({
					autoOpen: false,
					modal: true,
					buttons: {
						'remove': _.bind(function() {
							this.current_point.destroy({'wait': true});
							this.$el.dialog('close');
						}, this),
						'cancel': function() {
							$(this).dialog('close');
						}
					}
				});
			},
			show: function() {
				this.$el.dialog('open');
			}
		});
		return PeriodChartDialog;
	}
);

