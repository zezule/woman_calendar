define(['app/constant', 'backbone'],
	function(Constant, Backbone) {
		var Box = Backbone.View.extend({
			tagName: 'section',
			render: function() {
				throw new Error('[Abstract] Method is abstract and should be overwritten');
			}
		});
		Box.prototype.handle_event = function(event_name) {
			switch (event_name) {
				case Constant.CHART_BOX_NEW_DATA_READY_EVENT :
					this.$el.empty();
					this.render();
					break;
			}
		};
		return Box;
	}
);
