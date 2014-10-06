Game.Play = function (game) { };

A.num_cells  = 4; // number of cells per row and column
A.cell_width = (A.h - 1) / A.num_cells;

A.list = {
    alive: [],
    dead:  [],
};

A.color = {
    alive: 0xFFCCCC,
    dead:  0xF5F5F5,
};

A.keys = {};

Game.Play.prototype = {
    create: function () {
	game.stage.backgroundColor = '#ccc';
	
	A.grid = new Grid(A.num_cells, A.num_cells);

	A.list.alive.push([Math.floor(Math.random() * A.num_cells), Math.floor(Math.random() * A.num_cells)]);

	A.keys.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	A.keys.space.onDown.add(function () {
	    this.step();
	}, this);
	
	this.lists_to_grid();
	this.paint();
    },

    update: function () {

    },

    step: function () {
	var latest = A.list.alive[A.list.alive.length - 1];
	var neighbor;

	if (latest) {
	    neighbor = A.grid.randomEmptyNeighborOf(latest[0], latest[1]);

	    if (neighbor) {
		A.list.alive.push(neighbor);
	    }
	    else if (A.list.alive.length) {
		A.list.dead.push(A.list.alive.pop());
	    }
	}
	
	this.lists_to_grid();
	this.paint();
    },

    lists_to_grid: function () {
	for (var i = 0; i < A.list.alive.length; i++) {
	    A.grid.addPiece(A.list.alive[i][0], A.list.alive[i][1], 'alive', true);
	}
	for (var i = 0; i < A.list.dead.length; i++) {
	    A.grid.addPiece(A.list.dead[i][0], A.list.dead[i][1], 'dead', true);
	}
    },

    paint: function () {
	if (A.graphics) {
	    A.graphics.destroy();
	}

	A.graphics = game.add.graphics(0, 0);

	this.paint_grid();

	this.paint_list('alive');
	this.paint_list('dead');
    },

    paint_grid: function () {
	var dist;
	for (var i = 0; i < A.num_cells + 1; i++) {
	    dist = Math.floor(i * A.cell_width);
	    
	    this.paint_line(0, dist, A.w, dist);
	    this.paint_line(dist, 0, dist, A.h);
	}
    },

    paint_line: function (x1, y1, x2, y2) {
	A.graphics.lineStyle(1, 0x000000, 1);

	A.graphics.moveTo(x1, y1);
	A.graphics.lineTo(x2, y2);
    },

    paint_list: function (name) {
	var cell;
	for (var i = 0; i < A.list[name].length; i++) {
	    cell = A.list[name][i];
	    this.paint_cell(cell[0], cell[1], A.color[name]);
	}
    },

    paint_cell: function (x, y, color, opening) {
	val_x = Math.floor(x * A.cell_width);
	val_y = Math.floor(y * A.cell_width);

	var offset = {
	    x: 0,
	    y: 0,
	    wx: 0,
	    
	};
	
	this.paint_rect(val_x, val_y, A.cell_width, color);
    },
    
    paint_rect: function (x, y, width, color) {
	A.graphics.lineStyle(1, 0x000000, 0);
	A.graphics.beginFill(color, 1);
	A.graphics.drawRect(x+1, y+1, width-1, width-1);
    },
};
