define(['jquery',
		'lodash',
		'vent',
		'ractive',
		'text!templates/lobby.html'
	], function($, lodash, vent, Ractive, lobbyTpl) {
	var Lobby = function() {
		this.show = function() {
			this.$container.show();
		};

		this.hide = function(hideTrayButton) {
			this.$container.hide();
		};

		this.init = function() {
			var that = this,
				localAccount = localStorage.getObject('account');

			this.$container = $('.overlay-lobby');
			this.metacollector = {};

			vent.on('connected', function() {
				that.ractive.set('status', 'connected');
				if(localAccount) {
					// send local data to the server
					_.delay(function() {
						vent.trigger('localAccountFound', localAccount);
					}, 100);
				}
			});

			vent.on('disconnected', function() {
				that.ractive.set('visible', "true");
				that.ractive.set('spawned', "false");
				that.ractive.set('status', "disconnected");
			});

			// this should leave someplace else (together with metacollector!)
			vent.on('welcome', function(msg) {
				that.session_id = msg.session_id;
				that.player_id = msg.id;
			});

			vent.on('meta', function(meta) {
				that.metacollector[meta.id] = meta;
				that.ractive.set('players', that.metacollector);
			});
			vent.on('remove', function(msg) {
				if(that.metacollector[msg.id]) {
					delete that.metacollector[msg.id];
					that.ractive.set('players', that.metacollector);
				}
			});

			vent.on('player-has-spawned', function() {
				that.ractive.set('visible', false);
				that.ractive.set('spawned', true);
				// $('.spawn').text('Suicide');
				// $('.username').attr('disabled', true);
			});

			vent.on('player-has-died', function() {
				that.ractive.set('visible', true);
				that.ractive.set('spawned', false);
				// $('.spawn').text('Play!');
				// $('.username').attr('disabled', false);
			});

			vent.on('customize:end', function(localAccount) {
				localAccount = localStorage.getObject('account');
				that.ractive.set('account', localAccount);
			});

			this.ractive = new Ractive({
				el: this.$container[0],
				template: lobbyTpl,
				data: {
					players: this.metacollector,
					account: localAccount,
					status: 'connecting...',
					spawned: false,
					visible: true,
					sort: function(players) {
						//sort players by score desc
						return _.sortBy(_.map(players, function(meta, id) {
							return meta;
						}), "score").reverse();
					}
				}
			});

			this.ractive.on('customize', function() {
				vent.trigger('customize');
			});

			this.ractive.on('spawn', function() {
				vent.trigger('spawn');
			});

			this.ractive.on('close', function() {
				that.ractive.set('visible', false);
			});

			this.ractive.on('open', function() {
				that.ractive.set('visible', true);
			});
		};
	};

	return new Lobby();
});