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
        let dx = this.main.targetX - this.x;
        let dy = this.main.targetY - this.y;
        let power = Math.floor(Math.sqrt(dx * dx + dy * dy) / 8);
        let dX = this.main.targetX - this.x;
        let dY = this.main.targetY - this.y;
        let alpha = Math.atan2(dY, dX);
        let directionX = Math.cos(alpha);
        let directionY = Math.sin(alpha);
        let bullet_startX = this.x;
        let bullet_startY = this.y;
        let bullet = new Bullet(this.main, bullet_startX, bullet_startY, directionX,directionY, power);
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
