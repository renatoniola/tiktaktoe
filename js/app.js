(function () {
    let symbols = {
        'x': "❌",
        'o': '⭕'
    };

    this.oScore = 0;
    this.xScore = 0;
    this.oScoreEle = document.querySelector('.o-score');
    this.xScoreEle = document.querySelector('.x-score');

    const nextTurn = document.querySelector('.next-turn');
    const newGame = document.querySelector('.new-game');

    function bootstrap(skip) {
        this.letter = 'o';
        this.stop = false;
        this.board = Array(9).fill(null);
        this.winningComi = [];
        this.count = 0;
        this.winBox = document.querySelector('.win-box');
       
        nextTurn.innerHTML = symbols[letter];

        if (skip) { return }

        winBox.setAttribute('style', 'display: none');
        cells.forEach(function (cell) {
            cell.innerHTML = '';
            cell.setAttribute('style', 'background-color: white');
        });
    }

    bootstrap(true);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    newGame.addEventListener('click', (e) => {
        e.target.setAttribute('style', 'display: none');
        bootstrap(false);
    });


    const cells = document.querySelectorAll('.cells-container > div');

    cells.forEach(function (cell) {
        cell.addEventListener('click', (e) => {
            if (!stop && board[e.target.id] === null) {
                board[e.target.id] = letter;

                document.querySelector('.cell-' + e.target.id).innerHTML = symbols[letter];

                count++;
                if (count === 9 && !checkWin()) {

                    displyWinBox(true);
                    newGame.setAttribute('style', 'display: block'); 
                    return;
                }
                if (checkWin()) {
                    displyWinBox(false);
                    
                    newGame.setAttribute('style', 'display: block');
                    return;
                }
                letter = letter == 'x' ? 'o' : 'x';

                nextTurn.innerHTML = symbols[letter];
            }

        })
    });

    function displyWinBox(nowon) {

        winBox.innerHTML = nowon ? 'none won' : letter + ' wins!';
        winBox.setAttribute('style', 'display: block');
        stop = true;

        if (nowon) {return;}

        if (letter === 'o') {
            oScoreEle.innerHTML = ++oScore;
        } else if (letter === 'x') {
            xScoreEle.innerHTML = ++xScore;
        }

        cells.forEach(function (value, index) {
            
            if (winningComi.includes(index)) {
                value.setAttribute('style', 'background-color: green');
            } else {
                value.setAttribute('style', 'background-color: grey');
            }
        });

        
       
    }

    function checkWin() {
        if (count < 5) { return; }
        return winningCombinations.some(combination => {

            return combination.every(index => {
                winningComi = combination;
                return board[index] === letter;
            });
        });
    }

})()