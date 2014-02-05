define([
	'app/boxes/box',
	'jquery',
	'underscore'
],
	function(Box, $, _) {
		var RegisterBox = Box.extend({
			id: 'login_box',
			render: function() {
				//this.$el.append();
			}
		});
		return RegisterBox;
	});

