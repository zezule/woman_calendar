define(['jquery', 'backbone'],
	function($, Backbone) {
		var Tab = Backbone.View.extend({
			boxes: [],
			tab_tile_code: 'undefind',
			show: function() {
				this.$el.show();
			},
			hide: function() {
				this.$el.hide();
			},
			delegate: function(event_name) {
				_.each(this.boxes, function(box) {
					box.handle_event(event_name);
				}, this);
			},
			render_boxes: function() {
				_.each(this.boxes, function(Box) {
					Box.model = this.model;
					Box.render();
					this.$el.append(Box.el);
				}, this);
			}
		});
		return Tab;
	});