define([
	'app/boxes/box',
	'app/constant',
	'app/tabs/period_chart_dialog',
	'jquery',
	'hbs!template/period_frequency_box',
	'highcharts',
	'jquery_ui'
],
	function(Box, Constant, PeriodChartDialog, $, ChartBoxTpl) {
		var PeriodFrequencyChart = Box.extend({
			dialog: null,
			$chart: null,
			id: 'period_frequency_box',
			render: function() {
				this.$el.append(ChartBoxTpl());
				this.$chart = this.$el.find('#period_frequency_chart');
				this.dialog = new PeriodChartDialog();
				this.dialog.model = this.model;
				this.$chart.highcharts(this.get_options());
			}
		});

		PeriodFrequencyChart.prototype.extract_axis = function() {
			var axis = {'xAxis': [], 'series': []};
			_.each(_.rest(this.model.models), function(model, index) {
				axis.xAxis[index] = $.datepicker.formatDate(Constant.DATE_FORMAT, new Date(1000 * model.get_start_date()));
				axis.series[index] = {y: model.get_period_gap(), id: model.cid};
			});
			return axis;
		};

		PeriodFrequencyChart.prototype.redraw = function() {
			var chart = this.$chart.highcharts();
			var extract_axis = this.extract_axis(this.model);
			chart.xAxis[0].setCategories(extract_axis.xAxis, false);
			chart.series[0].setData(extract_axis.series, false);
			chart.redraw();
		};

		PeriodFrequencyChart.prototype.handle_event = function(event_name) {
			switch (event_name) {
				case Constant.CHART_BOX_NEW_DATA_READY_EVENT :
					this.redraw();
					break;
			}
		};

		PeriodFrequencyChart.prototype.get_options = function() {
			var T = window.Translator;
			var dialog = this.dialog;
			var extract_axis = this.extract_axis();
			return {
				chart: {
					type: 'line',
					width: 945
				},
				colors: ['#36bbc7'],
				title: {
					text: ''
				},
				legend: {
					enabled: false
				},
				credits: {
					enabled: false
				},
				tooltip: {
					formatter: function() {
						return T.translate('chart_box_tooltip_cycle_first_day') + ': ' + this.x + '<br/>' +
							T.translate('chart_box_tooltip_cycle_length') + ': ' + this.y;
					}
				},
				xAxis: {
					type: 'category',
					categories: extract_axis.xAxis,
					tickmarkPlacement: 'on',
					title: {
						text: T.translate('chart_box_chart_x')
					},
					labels: {
						rotation: 30,
						step: (Math.ceil(extract_axis.series.length / 12))
					},
					showLastLabel: false,
					startOnTick: true
				},
				yAxis: {
					title: {
						align: 'middle',
						text: T.translate('chart_box_chart_y')
					}
				},
				plotOptions: {
					series: {
						cursor: 'pointer',
						point: {
							events: {
								'click': function() {
									dialog.set_current_point(this);
									dialog.show();
								}
							}
						}
					}
				},
				series: [{
						name: T.translate('chart_box_chart_series_name'),
						data: extract_axis.series
					}]
			};
		};

		return PeriodFrequencyChart;
	});