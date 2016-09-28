window.onload = init;
var playButton; //кнопка начала игры
var int; // счетчик шагов в игре
var buttons; // массив всех div'ов
var fields; // массиво маленьких полей
var head; // надпись верхняя
var mainField; // главное поле игры

function init() {
    playButton = document.getElementById("playBtn");
    head = document.getElementById("header");
    buttons = [];
    fields = [];
    for (var a = 0; a < 3; a++) {
        fields[a] = [];
        buttons[a] = [];
        for (var b = 0; b < 3; b++) {
            fields[a][b] = new Field();
            buttons[a][b] = [];
            for (var c = 0; c < 3; c++) {
                buttons[a][b][c] = [];
                for (var d = 0; d < 3; d++) {
                    var str = "btn" + a + b + c + d;
                    buttons[a][b][c][d] = document.getElementById(str);
                }
            }
        }
    }
    playButton.addEventListener("click", playGame, false);
}

function playGame() {
    mainField = new Field();
    header.innerHTML = "Крестики-Нолики";
    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            fields[a][b].cleanField();
            for (var c = 0; c < 3; c++) {
                for (var d = 0; d < 3; d++) {
                    addTouch(buttons[a][b][c][d]);
                    buttons[a][b][c][d].innerHTML = " ";
                }
            }
        }
    }
    int = 0;
}

function tap() {
    var str = "XO";
    var char = str[int % 2];
    var a = parseInt(this.id[3]);
    var b = parseInt(this.id[4]);
    var c = parseInt(this.id[5]);
    var d = parseInt(this.id[6]);
    changeBtnOnTheScr(a, b, c, d, char);

    if (int % 2 == 0 && fields[a][b].winX()) {
        littleGameOver(a, b, char);
        if (mainField.winX()) {
            gameOver(char);
            return;
        }
    } else if (int % 2 == 1 && fields[a][b].winO()) {
        littleGameOver(a, b, char);
        if (mainField.winO()) {
            gameOver(char);
            return;
        }
    } else if (fields[a][b].step == 9) {
        if (fields[a][b].draw()) {
            littleGameOver(a, b, "X");
            if (mainField.winX()) {
                gameOver(char);
                return;
            }
        } else {
            littleGameOver(a, b, "O");
            if (mainField.winO()) {
                gameOver(char);
                return;
            }
        }
    }
    if (!fields[c][d].isOver) {
        disableButtons(c, d);

    } else {
        enableAllButtons();
    }

    int = int + 1;


}
// изменение дива на экране
function changeBtnOnTheScr(a, b, c, d, char) {
    fields[a][b].nextStep(c, d, char);
    removeTouch(buttons[a][b][c][d]);
    buttons[a][b][c][d].innerHTML = char;
    if (char == "X") {
        buttons[a][b][c][d].style.backgroundColor = "#ffcccc";
        buttons[a][b][c][d].style.color = "#ff0000";
    } else {
        buttons[a][b][c][d].style.backgroundColor = "#ccccff";
        buttons[a][b][c][d].style.color = "#0000ff";
    }
    // поменять цвет фона
    // поменять цвет текста
}

function addTouch(button) {
    button.addEventListener("click", tap, false);
    button.style.backgroundColor = '#b3b3b3';
}

function removeTouch(button) {
    button.removeEventListener("click", tap);
    button.style.backgroundColor = '#fff';
}

function disableButtons(m, n) {
    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            for (var c = 0; c < 3; c++) {
                for (var d = 0; d < 3; d++) {
                    if (a == m && n == b && fields[a][b].isAvailable(c, d)) {
                        addTouch(buttons[a][b][c][d]);

                    } else {
                        if (fields[a][b].isAvailable(c, d)) {
                            removeTouch(buttons[a][b][c][d]);
                        }
                    }
                }
            }
        }
    }
}



function enableAllButtons() {

    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            for (var c = 0; c < 3; c++) {
                for (var d = 0; d < 3; d++) {
                    if (fields[a][b].isAvailable(c, d)) {
                        addTouch(buttons[a][b][c][d]);
                    }
                }
            }
        }
    }

}

function littleGameOver(a, b, char) {
    for (var c = 0; c < 3; c++) {
        for (var d = 0; d < 3; d++) {
            changeBtnOnTheScr(a, b, c, d, char);
        }
    }
    mainField.nextStep(a, b, char);
    fields[a][b].isOver = 1;
}

function gameOver(char) {
    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            for (var c = 0; c < 3; c++) {
                for (var d = 0; d < 3; d++) {
                    changeBtnOnTheScr(a, b, c, d, char);

                }
            }
        }
    }
    head.innerHTML = "WIN " + char;

}
