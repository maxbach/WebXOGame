function Field() {
    this.field = [];
    for (var i = 0; i < 3; i++) {
        this.field[i] = [];
    }
    this.step = 0;
    this.isOver = 0;

    this.cleanField = function() {
        for (var a = 0; a < 3; a++) {
            for (var b = 0; b < 3; b++) {
                this.field[a][b] = " ";
            }
        }
    }

    this.nextStep = function(a, b, XO) {
        this.field[a][b] = XO;
        this.step = this.step + 1;
    }

    this.isAvailable = function(a, b) {
        if (!this.isOver) {
            if (this.field[a][b] != " ") {
                return 0;
            } else {
                return 1;
            }
        } else {
            return 0;
        }
    }

    this.draw = function() {
        var x = 0;
        var o = 0;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.field[i][j] == "X") {
                    x++;
                } else {
                    o++;
                }
            }
        }

        return x > o;
    }

    this.winX = function() {
        if (this.step > 1) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (this.field[i][j] != "X") {
                        break;
                    }
                    if (j == 2) {
                        return 1;
                    }
                }

                for (var j = 0; j < 3; j++) {
                    if (this.field[j][i] != "X") {
                        break;
                    }
                    if (j == 2) {
                        return 1;
                    }
                }
            }

            for (var i = 0; i < 3; i++) {
                if (this.field[i][i] != "X") {
                    break;
                }
                if (i == 2) {
                    return 1;
                }
            }

            for (var i = 0; i < 3; i++) {
                if (this.field[2 - i][i] != "X") {
                    break;
                }
                if (i == 2) {
                    return 1;
                }
            }

            return 0;
        } else {
            return 0;
        }

    }

    this.winO = function() {
        if (this.step > 1) {
            for (var i = 0; i < 3; i++) {

                for (var j = 0; j < 3; j++) {
                    if (this.field[i][j] != "O") {
                        break;
                    }
                    if (j == 2) {
                        return 1;
                    }
                }

                for (var j = 0; j < 3; j++) {
                    if (this.field[j][i] != "O") {
                        break;
                    }
                    if (j == 2) {
                        return 1;
                    }
                }
            }

            for (var i = 0; i < 3; i++) // прямая диагональ
            {
                if (this.field[i][i] != "O") {
                    break;
                }
                if (i == 2) {
                    return 1;
                }
            }

            for (var i = 0; i < 3; i++) // косая диагональ
            {
                if (this.field[2 - i][i] != "O") {
                    break;
                }
                if (i == 2) {
                    return 1;
                }
            }

            return 0;
        } else {
            return 0;
        }

    }
}
