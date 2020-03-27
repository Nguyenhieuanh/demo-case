let canvas = document.getElementById('screen');
// canvas.style.display = 'none';
let ctx = canvas.getContext('2d');
let BattleField = function () {
    this.bullets = [];
    this.isOver = false;
    this.turn = 1;
    this.targetX = 0;
    this.targetY = 0;
    this.start = function () {
        ctx.drawImage(BACK_GROUND, 0, 0, 1000, 500);
        this.tank = new Tank(this, Math.random() * (GAMEBOARD_WIDTH - 70), TANK_1_RIGHT,TANK_1_LEFT);
        this.enemy = new Tank(this, Math.random() * (GAMEBOARD_WIDTH - 70), TANK_2_RIGHT,TANK_2);
        this.tank.draw();
        this.tank.drawHealthBar();
        this.tank.drawStaminaBar();
        this.enemy.draw();
        this.enemy.drawHealthBar();
        this.enemy.drawStaminaBar();
    };

    this.render = function () {
        // if (this.isOver) {
        //     this.gameOverDraw();
        // }
        ctx.clearRect(0, 0, GAMEBOARD_WIDTH, GAMEBOARD_HEIGHT);
        ctx.drawImage(BACK_GROUND, 0, 0, 1000, 500);
        this.tank.draw();
        this.tank.drawHealthBar();
        this.tank.drawStaminaBar();
        this.enemy.draw();
        this.enemy.drawHealthBar();
        this.enemy.drawStaminaBar();
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].bullet_move();
            this.bullets[i].draw(i + 1);
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
        } else {
            this.enemy = new Tank(this, this.enemy.getX(), EXPLOSIVE);
        }
    };

    this.collisionDetected = function () {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.turn === 1) {
                if (this.tank.collision(this.bullets[i]) && this.tank.health > 0) {
                    explosionSound.play();
                    this.tank.takeDamage();
                    this.removeBullet(this.bullets[i]);
                    break;
                } else if (this.tank.collision(this.bullets[i]) && this.tank.health <= 0) {
                    explosionSound.play();
                    this.removeObj(this.tank);
                    this.removeBullet();
                    this.isOver = true;
                }
            } else {
                if (this.enemy.collision(this.bullets[i]) && this.enemy.health > 0) {
                    explosionSound.play();
                    this.enemy.takeDamage();
                    this.removeBullet(this.bullets[i]);
                    break;
                } else if (this.enemy.collision(this.bullets[i]) && this.enemy.health <= 0) {
                    explosionSound.play();
                    this.removeObj(this.enemy);
                    this.removeBullet();
                    this.isOver = true;
                }
            }
        }
        this.render();
    };

    this.changeTurn = function () {
        if (this.turn === 1) {
            this.tank.stamina = MAX_STAMINA;
            this.tank.fire();
            this.turn = 2;
            this.collisionDetected();
        } else {
            this.enemy.stamina = MAX_STAMINA;
            this.enemy.fire();
            this.turn = 1;
            this.collisionDetected();
        }
    };
    this.mousemove = function (e) {
        this.targetX = e.clientX;
        this.targetY = e.clientY;
        console.log(this.targetX, this.targetY);
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
    if (game.isOver) {
        ctx.drawImage(GAME_OVER, 250, 0, 500, 500);
        return;
    }
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
