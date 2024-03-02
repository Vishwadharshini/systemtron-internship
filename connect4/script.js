let playerred = 'R';
let playeryellow = 'Y';
let currentplayer = playerred;

let gameover = false;
let board;
let currentcolumns;

let rows = 6;
let cols = 7;

window.onload = function () {
    setgame();
}

function setgame() {
    board = [];
    currentcolumns = [5, 5, 5, 5, 5, 5, 5]

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            row.push(' ');

            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add('tile');
            tile.addEventListener('click', setpiece);
            document.getElementById('gameboard').append(tile);
        }
        board.push(row);
    }
}

function setpiece() {
    if (gameover) {
        return;
    }

    let coords = this.id.split('-');  //"0-0" => ["0" , "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currentcolumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currentplayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currentplayer === playerred) {
        tile.classList.add('red-piece');
        currentplayer = playeryellow
    }
    else {
        tile.classList.add('yellow-piece');
        currentplayer = playerred;
    }

    r -= 1; //updating the row height for the column
    currentcolumns[c] = r;  //update the array

    checkwinner();
}

function checkwinner() {
    //horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setwinner(r, c);
                    return;
                }
            }
        }
    }

    //vertically
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows-3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setwinner(r, c);
                    return;
                }
            }

        }
    }

    //antidiagonally
    for(let r=0; r<rows-3; r++){
        for(let c = 0; c<cols-3; c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setwinner(r,c);
                    console.log(r,c);
                    return;
                }
            }
        }
    }

    //diagonally
    for(let r = 3; r<rows; r++){
        for(let c = 0; c<cols - 3;c++){
            if(board[r][c] !== ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setwinner(r,c);
                    return;
                }
            }
        }
    }
}

function setwinner(r, c) {
    let winner = document.getElementById('winner');
    console.log(r,c)
    if (board[r][c] == playerred) {
        winner.innerHTML = "Red Wins";
    }
    else {
        winner.innerHTML = 'Yellow Wins';
    }

    gameover = 0;
}