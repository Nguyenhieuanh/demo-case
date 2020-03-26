let canvas = document.getElementById('screen');
let ctx = canvas.getContext('2d');
let BattleField = function () {
    this.bullets = [];
    this.isOver = false;
    this.isCollision = false;
    this.turn = 1;
    this.start = function () {
        ctx.drawImage(BACK_GROUND, 0, 0, 1000, 500);
        this.tank = new Tank(this, Math.random() * (GAMEBOARD_WIDTH - 70), TANK_1);
        this.enemy = new Tank(this, Math.random() * (GAMEBOARD_WIDTH - 70), TANK_2);
        this.tank.draw();
        this.enemy.draw();
    };


    this.render = function () {
        if (this.isOver) {
            return;
        }
        ctx.clearRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
        ctx.drawImage(BACK_GROUND, 0, 0, 1000, 500);
        this.tank.draw();
        this.enemy.draw();
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].bullet_move();
            this.bullets[i].draw();
        }
    };

    this.moveTank = function (event) {
        let orientation = 0;
        switch (event.which) {
            case 37:
                orientation = ORIENTATION_LEFT;
                moveSound.play();
                break;
            case 39:
                orientation = ORIENTATION_RIGHT;
                moveSound.play();
                break;
        }
        this.controlTank(orientation);
    };

    this.controlTank = function (orientation) {
        if (this.turn === 1) {
            this.tank.orientation = orientation;
            this.tank.move();
        } else {
            this.enemy.orientation = orientation;
            this.enemy.move();
        }
    };

    this.getEnemy = function () {
        return this.enemy;
    };

    this.removeBullet = function (bullet) {
        let index = -1;
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i] === bullet) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            this.bullets.splice(index, 1);
        }
    };

    this.removeObj = function (obj) {
        if (obj === this.tank) {
            this.tank = new Tank(this, this.tank.getX(), EXPLOSIVE);
            this.end();
        } else
            this.enemy = new Tank(this, this.enemy.getX(), EXPLOSIVE);
        this.end();
    };

    this.collisionDetected = function () {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.turn === 1) {
                if (this.tank.collision(this.bullets[i])) {
                    explosionSound.play();
                    this.removeObj(this.tank);
                    this.removeBullet(this.bullets[i]);
                    this.isCollision = true;
                    break;
                }
            } else if (this.enemy.collision(this.bullets[i])) {
                explosionSound.play();
                this.removeObj(this.enemy);
                this.removeBullet(this.bullets[i]);
                this.isCollision = true;
                break;
            }
        }
        this.render();
    };

    this.end = function () {
        if (this.isCollision) {
            this.isOver = true;
        }
    };

    this.changeTurn = function () {
        if(this.isOver) return;
        if (this.turn === 1) {
            this.tank.stamina = 50;
            this.tank.fire();
            this.turn = 2;
            this.collisionDetected()
        } else {
            this.enemy.stamina = 50;
            this.enemy.fire();
            this.turn = 1;
        }
    }
};


let game = new BattleField();
let explosionSound = new sound('sound/explosion1.mp3');
let tankFireSound = new sound('sound/tankfire.mp3');
let moveSound = new sound('sound/move.mp3');
game.start();
main();

function main() {
    game.collisionDetected();
    game.render();
    requestAnimationFrame(main);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    };
    this.stop = function () {
        this.sound.pause();
    }
}