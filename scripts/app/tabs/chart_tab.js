define([
	'hbs!template/chart_tab',
	'app/tabs/tab',
	'app/boxes/your_period_box',
	'app/boxes/period_form_box',
	'app/boxes/period_frequency_box',
	'jquery',
	'underscore',
	'backbone'
],
	function(chart_tab_tpl, Tab, YourPeriodBox, PeriodFormBox, PeriodChartBox, $, _, Backbone) {
		var ChartTab = Tab.extend({
			tab_tile_code: 'chart_tab',
			boxes: [],
			init_boxes: function() {
				this.boxes.push(new PeriodFormBox());
				this.boxes.push(new YourPeriodBox());
				this.boxes.push(new PeriodChartBox());
			},
			render: function() {
				this.$el.append(chart_tab_tpl());
				this.init_boxes();
				this.render_boxes();
			}
		});
		return ChartTab;
	});