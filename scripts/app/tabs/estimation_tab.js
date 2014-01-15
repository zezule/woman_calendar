define([
	'hbs!template/estimation_tab',
	'app/boxes/future_period_estimation_box',
	'app/tabs/tab',
	'jquery',
	'backbone'
],
	function(estimation_tab_tpl, FuturePeriodEstimation, Tab, $) {
		var EstimationTab = Tab.extend({
			boxes: [],
			tab_tile_code: "estimation_tab",
			$calendar_container: null,
			init_boxes: function() {
				this.boxes.push(new FuturePeriodEstimation());
			},
			render: function() {
				this.$el.append(estimation_tab_tpl());
				this.init_boxes();
				this.render_boxes();
			}
		});
		return EstimationTab;
	});