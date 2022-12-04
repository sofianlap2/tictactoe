const cols = 3
const rows = 3
const board = []
const tic = 'X'
const toe = 'O'
let currentPlayer = tic
let gameOver = false
let clickedTiles = 0


window.onload = function() {
    startGame()
}

function startGame() {
    for(let r = 0; r < rows; r++) {
        let row = []
        for(let c = 0; c < cols; c++) {
            const tile = document.createElement('div')
            tile.classList.add('tile')
            tile.id = r.toString() + '-' + c.toString()
            tile.addEventListener('click', setTick)
            row.push(' ')
            document.getElementById('board').append(tile)
        }
        board.push(row)
    }
}

function setTick() {
    if(this.innerText !== '') return
    if(clickedTiles === 8) {
        document.getElementById('winner').innerText = 'no winner here'
    }
    const coords = this.id.split('-')
    const r = coords[0]
    const c = coords[1]

    this.innerText = currentPlayer
    board[r][c] = currentPlayer

    checkWinner()

    if(currentPlayer === tic) {
        currentPlayer = toe
    } else {
        currentPlayer = tic
    }
    clickedTiles++
}

function checkWinner() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            if(board[r][c] === ' ') {
                continue
            }
            if(board[r][c] !== ' ' && board[r][c] === board[r][c+1] && board[r][c+1] === board[r][c+2]) {
                gameOver = true
                document.getElementById('winner').innerText = currentPlayer + ' has won'
                return
            }
        }
    }

    let startC = 0
    for(let r = 0; r < rows; r++) {
        if(board[startC][r] === ' ') {
            continue
        }
        if(board[startC][r] === board[startC+1][r] && board[startC+1][r] === board[startC+2][r]) {
            gameOver = true
            document.getElementById('winner').innerText = currentPlayer + ' has won'
            return
        }
    }

    if(board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        gameOver = true
        document.getElementById('winner').innerText = currentPlayer + ' has won'
        return
    }

    if(board[2][0] !== ' ' && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        gameOver = true
        document.getElementById('winner').innerText = currentPlayer + ' has won'
        return
    }
}