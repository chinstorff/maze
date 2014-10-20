Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen


	// load everything
	game.load.image('title', 'assets/img/title.png');
    },

    create: function () {
	game.state.start('Menu');
    }
};
