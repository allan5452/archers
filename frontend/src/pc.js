if(!window.pc) {
	window.pc = {};
	pc.VERSION = '0.5.6';
}

define(['playcraft/ext/gamecore.js/src/gamecore', 'playcraft/ext/gamecore.js/src/class', 'playcraft/ext/gamecore.js/src/base', 'playcraft/ext/gamecore.js/src/jhashtable', 'playcraft/ext/gamecore.js/src/device', 'playcraft/ext/gamecore.js/src/perf', 'playcraft/ext/gamecore.js/src/linkedlist', 'playcraft/ext/gamecore.js/src/hashlist', 'playcraft/ext/gamecore.js/src/stacktrace', 'playcraft/ext/gamecore.js/src/pooled', 'playcraft/ext/box2dweb.2.1a-pc', 'playcraft/boot', 'playcraft/input', 'playcraft/hashmap', 'playcraft/tools', 'playcraft/color', 'playcraft/debug', 'playcraft/device', 'playcraft/sound', 'playcraft/layer', 'playcraft/entitylayer', 'playcraft/tileset', 'playcraft/tilemap', 'playcraft/tilelayer', 'playcraft/hextilelayer', 'playcraft/entity', 'playcraft/sprite', 'playcraft/spritesheet', 'playcraft/math', 'playcraft/image', 'playcraft/scene', 'playcraft/game', 'playcraft/loader', 'playcraft/dataresource', 'playcraft/components/component', 'playcraft/components/physics', 'playcraft/components/alpha', 'playcraft/components/joint', 'playcraft/components/expiry', 'playcraft/components/originshifter', 'playcraft/components/spatial', 'playcraft/components/overlay', 'playcraft/components/clip', 'playcraft/components/activator', 'playcraft/components/input', 'playcraft/components/fade', 'playcraft/components/spin', 'playcraft/components/scale', 'playcraft/components/rect', 'playcraft/components/poly', 'playcraft/components/circle', 'playcraft/components/text', 'playcraft/components/sprite', 'playcraft/components/layout', 'playcraft/components/particleemitter', 'playcraft/systems/system', 'playcraft/es/entitymanager', 'playcraft/es/systemmanager', 'playcraft/systems/entitysystem', 'playcraft/systems/physics', 'playcraft/systems/effects', 'playcraft/systems/particles', 'playcraft/systems/input', 'playcraft/systems/expiry', 'playcraft/systems/activation', 'playcraft/systems/render', 'playcraft/systems/layout'],
	function() {
		return window.pc;
});