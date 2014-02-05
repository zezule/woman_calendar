define([
	'app/boxes/box',
	'hbs!template/login_box_tpl',
	'jquery',
	'underscore'
],
	function(Box, login_box_tpl, $, _) {
		var LoginBox = Box.extend({
			events: {
				'click #login_user': 'login'
			},
			login: function(e) {
				e.preventDefault();
				var link = $(e.target);
				var form = this.$el.find('form')[0];
				$.ajax({
					type: "POST",
					url: form.action,
					data: {
						'email': form.email.value,
						'password': form.password.value
					},
					success: function(response) {
						if (response.STATUS === 'ok') {
							window.location.href = link.attr('data-href');
						}
					},
					dataType: 'json'
				});
			},
			render: function() {
				this.$el.append(login_box_tpl());
			}
		});
		return LoginBox;
	});

