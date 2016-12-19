var restart = function(){
    model.init(7, 6);
    view.init();
}

window.onload = function() {
    restart();
}

var model = {
    init: function(row, col) {
        var i;
        var j;
        var line;

        this.row = row;
        this.col = col;
        this.count = 0;
        this.startPos = new Array(col);
        this.startPos.fill(row - 1);
        this.markCol;
        this.markRow;

        this.cells = [];
        for(i = 0; i < row; i++) {
            line = [];
            for(j = 0; j < col; j++) {
                line.push(0);
            }
            this.cells.push(line);
        }
    }
}

var control = {
    getRow : function() {
        return model.row;
    },

    getCol: function() {
        return model.col;
    },

    mark: function(colIdx) {
        model.markCol = colIdx;
        model.markRow = model.startPos[colIdx];
        model.cells[model.markRow][model.markCol] = this.getPlayer();
        model.count++;
        model.startPos[colIdx]--;
    },

    getMarkCol: function() {
        return model.markCol;
    },

    getMarkRow: function() {
        return model.markRow;
    },

    getColor: function() {
        return model.count % 2 == 0 ? "red" : "blue";
    },

    getPlayer: function() {
        return model.count % 2 + 1;
    },

    win: function () {
        var i, j;
        var row = model.row,
            col = model.col,
            board = model.cells;

        var check = function(a, b, c, d) {
            return a != 0 && a == b && b == c && c == d;
        }

        for(i = 0; i < row; i++) {
            for(j = 0; j < col - 3; j++) {
                if(check(board[i][j], board[i][j+ 1], board[i][j + 2], board[i][j + 3])) {
                    return true;
                }
            }
        }
        for(i = 0; i < row - 3; i++) {
            for(j = 0; j < col; j++) {
                if(check(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])) {
                    return true;
                }
            }
        }

        for(i = 0; i < row - 3; i++) {
            for(j = 0; j < col - 3; j++) {
                if(check(board[i][j], board[i + 1][j + 1], board[i + 2][j + 2], board[i + 3][j + 3])) {
                    return true;
                }
            }
        }

        for(i = 3; i < row; i++) {
            for(j = 0; j < col - 3; j++) {
                if(check(board[i][j], board[i - 1][j + 1], board[i - 2][j + 2], board[i - 3][j + 3])) {
                    return true;
                }
            }
        }
        return false;
    }
}

var view = {
    init: function() {
        this.table = document.getElementById("board");

        var that = this;
        this.table.onclick = function(ev) {
            control.mark(ev.target.parentElement.cellIndex);
            that.mark();

            if(control.win()) {
                alert(control.getPlayer() + ' win');
                table.style.pointerEvents = 'none';
            }
        }
        
        this.render();
    },

    mark: function() {
        var cell = document.querySelector('[data-row-id="' + control.getMarkRow() 
            + '"][data-col-id="' + control.getMarkCol() + '"]');
        cell.style.background = control.getColor();
    },

    render: function() {
        var i, j, tr, td, div;
        this.table.innerHTML = "";

        for (i = 0; i < control.getRow(); i++) {
            tr = document.createElement('tr');
            for (j = 0; j < control.getCol(); j++) {
                td = document.createElement('td');
                div = document.createElement('div');
                div.setAttribute('data-row-id', i);
                div.setAttribute('data-col-id', j);
                td.appendChild(div);
                tr.appendChild(td);
            }
            this.table.appendChild(tr);
        }
    }
}
