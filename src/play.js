Game.Play = function (game) { };

A.num_cells = 10;
A.list = {
    alive: [],
    dead:  [],
};

Game.Play.prototype = {
    create: function () {
	game.stage.backgroundColor = '#eee';
	
	A.grid = new Grid(A.num_cells, A.num_cells);

	A.list.alive.push([Math.floor(Math.random() * A.num_cells), Math.floor(Math.random() * A.num_cells)]);

	this.lists_to_grid();
	this.paint_grid();
    },

    update: function () {

    },
k
    step: function () {
	var latest = A.list.alive[A.list.alive.length - 1];
	var neighbor = A.grid.randomEmptyNeighborOf(latest[0], latest[1]);
	
	this.lists_to_grid();
	this.paint_grid();
    },

    lists_to_grid: function () {
	for (var i = 0; i < A.list.alive.length; i++) {
	    A.grid.addPiece(A.list.alive[i][0], A.list.alive[i][1], 'alive', true);
	}
	for (var i = 0; i < A.list.dead.length; i++) {
	    A.grid.addPiece(A.list.dead[i][0], A.list.dead[i][1], 'dead', true);
	}
    },

    paint_grid: function () {
	if (A.graphics) {
	    A.graphics.destroy();
	}

	A.graphics = game.add.graphics(0, 0);
	A.graphics.lineStyle(1, 0x000000, 1);

	var cell_width = (A.h - 1) / A.num_cells;
	var val_x, val_y, color;
	for (var i = 0; i < A.num_cells; i++) {
	    for (var j = 0; j < A.num_cells; j++) {
		val_x = Math.floor(i * cell_width);
		val_y = Math.floor(j * cell_width);

		color = 0xCCCCCC;		
		switch (A.grid.contentsOf(i, j)) {
		case 'alive':
		    color = 0xFFCCCC;
		    break;
		case 'dead':
		    color = 0xF5F5F5;
		    break;
		}
		
		this.paint_rect(val_x, val_y, cell_width, color);
	    }
	}
    },

    paint_rect: function (x, y, width, color) {
	A.graphics.beginFill(color, 1);
	A.graphics.drawRect(x, y, width, width);
    },
};
