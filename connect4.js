var restart = function(){
    document.getElementById("game").innerHTML = "";
    createBoard(7,6);
}

var createBoard = function() {
    var board = new Board(7, 6);
}

var Board = function(row, col) {
    var count = 0;
    var startPos = new Array(col);
    startPos.fill(row - 1);

    var cells = [];
    for(var i = 0; i < row; i++) {
        var line = [];
        for(var j = 0; j < col; j++) {
            line.push(0);
        }
        cells.push(line);
    }

    var table = document.createElement("table");
    table.id = "board";
    for (var i = 0; i < row; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < col; j++) {
            var td = document.createElement('td');
            var div = document.createElement('div');
            div.setAttribute('data-row-id', i);
            div.setAttribute('data-col-id', j);
            td.appendChild(div);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    table.onclick = function(ev) {
        var rowId = ev.target.parentElement.parentElement.rowIndex;
        var colId = ev.target.parentElement.cellIndex
        mark(rowId, colId);
        if(win(cells, row, col)) {
            alert(getPlayer(count) + ' win');
            table.style.pointerEvents = 'none';
        }
        count++;
        startPos[colId]--;
    }
    document.getElementById("game").appendChild(table);


    var mark = function(rowId, colId) {
        var color = (count % 2 == 0) ? "red" : "blue";
        var markRow = startPos[colId];
        var cell = document.querySelector('[data-row-id="' + markRow + '"][data-col-id="' + colId + '"]');
        cell.style.background = color;
        cells[markRow][colId] = getPlayer(count);
    }

    var getPlayer = function(count) {
        return count % 2 + 1;
    }
    
    var win = function (board, row, col) {
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
                    console.log(i +  " " + j);
                    console.log(board);
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

    var check = function(a, b, c, d) {
        return a != 0 && a == b && b == c && c == d;
    }
}

