define(['app/constant', 'app/tabs/chart_tab_data', 'hbs!template/main_menu', 'backbone', 'jquery'],
	function(Constant, ChartTabData, main_menu_el_tpl, Backbone) {
		var TabManager = Backbone.View.extend({
			tabs: {},
			events: {
				'click li': 'changeTab'
			},
			constructor: function() {
				Backbone.View.apply(this, arguments);
			},
			render: function() {
				this.$el.append(main_menu_el_tpl({'menu_positions': this.tabs}));
			},
			run: function() {
				this.model = new ChartTabData();
				this.model.fetch({'success': _.bind(this.setup, this)});
			},
			setup: function() {
				this.render();
				this.extend_model();
				_.each(this.tabs, function(tab) {
					tab.model = this.model;
					tab.render();
				}, this);
				this.listenTo(this.model, 'add', _.bind(this.delegate, this));
				this.listenTo(this.model, 'destroy', _.bind(this.delegate, this));
				this.show_tab();
			},
			extend_model: function() {
				_.each(this.model.models, function(model, index, collection) {
					var current = Math.ceil(model.get_start_date() / Constant.DAY);
					var gap = 0;
					if (index > 0) {
						var prev = Math.ceil(collection[index - 1].get_start_date() / Constant.DAY);
						gap = current - prev;
					}
					model.set('period_gap', gap, {silent: true});
				});
			},
			delegate: function() {
				this.extend_model();
				_.each(this.tabs, function(tab) {
					tab.delegate(Constant.CHART_BOX_NEW_DATA_READY_EVENT);
				}, this);
			}});

		TabManager.prototype.show_tab = function(visibleTab) {
			visibleTab || (visibleTab = this.tabs[_.keys(this.tabs)[0]]);
			this.testTabId(visibleTab.el.id);
			for (var tab_id in this.tabs) {
				this.testTabId(tab_id);
				this.tabs[tab_id].hide();
			}
			visibleTab.show();
		};

		TabManager.prototype.changeTab = function(menu_event) {
			var menu_pos = $(menu_event.target).attr('data-pos-id');
			this.show_tab(this.tabs[menu_pos]);
		};

		TabManager.prototype.add = function(tab) {
			this.tabs[tab.el.id] = tab;
		};

		TabManager.prototype.testTabId = function(tab_id) {
			if (!this.tabs.hasOwnProperty(tab_id)) {
				throw new Error('Tab identyfied by ' + tab_id + ' does not exist');
			}
		};

		return TabManager;
	}
);
