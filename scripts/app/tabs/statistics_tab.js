define(['hbs!template/statistics_tab', 'app/tabs/tab', 'app/boxes/period_statistic_box', 'jquery', 'backbone'],
	function(statistics_tab_tpl, Tab, PeriodStatisticBox) {
		var StatisticsTab = Tab.extend({
			tab_tile_code: "statistics_tab",
			boxes: [],
			init_boxes: function() {
				this.boxes.push(new PeriodStatisticBox({el: '#period_statistics_box'}));
			},
			render: function() {
				this.$el.append(statistics_tab_tpl({}));
				_.each(this.boxes, function(Box) {
					Box.model = this.model;
					Box.render();
				}, this);
			}
		});
		return StatisticsTab;
	});
