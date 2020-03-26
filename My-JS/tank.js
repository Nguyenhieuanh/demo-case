let Tank = function (main, x, tankImg) {
    this.main = main;
    this.x = x;
    this.y = 320;
    this.tankImage = tankImg;
    this.speed = 3;
    this.isFire = false;
    this.stamina = 50;
    this.getX = function () {
        return this.x;
    };

    this.checkStamina = function () {
        if (this.stamina === 0)
            return false;
    };

    this.getY = function () {
        return this.y;
    };

    this.draw = function () {
        ctx.drawImage(this.tankImage, this.x, this.y, TANK_WIDTH, TANK_HEIGHT);
    };

    this.move = function () {
        if (this.stamina !== 0) {
            switch (this.orientation) {
                case ORIENTATION_LEFT:
                    this.x -= this.speed;
                    this.stamina--;
                    this.checkStamina();
                    break;
                case  ORIENTATION_RIGHT:
                    this.x += this.speed;
                    this.stamina--;
                    this.checkStamina();
                    break;
            }
        }
        return false;
    };

    this.fire = function () {
        if (this.main.isOver) return;
        tankFireSound.play();
        let bullet = new Bullet(this.main, this.x + TANK_WIDTH / 2, this.y - 17);
        this.main.bullets.push(bullet);
        return this.isFire;
    };

    this.collision = function () {
        for (let i = 0; i < main.bullets.length; i++) {
            let bX = this.main.bullets[i].x;
            let bY = this.main.bullets[i].y;
            let dX = Math.abs((bX + main.bullets[i].radius / 2) - (this.x + TANK_WIDTH / 2));
            let dY = Math.abs((bY + main.bullets[i].radius / 2) - (this.y + TANK_HEIGHT / 2));
            if ((dX <= (this.main.bullets[i].radius + TANK_WIDTH) / 2) && (dY < (this.main.bullets[i].radius + TANK_HEIGHT) / 2)) {
                return true;
            }
        }
    };
};
