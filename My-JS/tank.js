let Tank = function (main, x, tankImg,tankImg2) {
    this.main = main;
    this.x = x;
    this.y = 336;
    this.tankImage = tankImg;
    this.speed = 3;
    this.isFire = false;
    this.stamina = MAX_STAMINA;
    this.health = MAX_HEALTH;
    this.getX = function () {
        return this.x;
    };

    this.takeDamage = function () {
        for (let i = 0; i < this.main.bullets.length; i++) {
            if (this.collision(this.main.bullets[i])) {
                this.health -= this.main.bullets[i].damage;
                console.log(this.health);
            }
        }
    };
    this.checkStamina = function () {
        if (this.stamina === 0)
            return false;
    };

    this.draw = function () {
        ctx.drawImage(this.tankImage, this.x, this.y, TANK_WIDTH, TANK_HEIGHT);
    };

    this.drawHealthBar = function () {
        let x = this.x;
        let y = this.y + TANK_HEIGHT + 5;

        ctx.fillStyle = 'red';
        let width = 100 * this.health / MAX_HEALTH;
        if (width < 0) {
            width = 0;
        }
        ctx.fillRect(x - 20, y, width, 10);

        ctx.strokeStyle = 'black';
        ctx.strokeRect(x - 20, y, 100, 10);
    };

    this.drawStaminaBar = function () {
        let sx = this.x;
        let sy = this.y + TANK_HEIGHT + 5;

        ctx.fillStyle = 'yellow';
        let width = 100 * this.stamina / MAX_STAMINA;
        if (width < 0) {
            width = 0;
        }
        ctx.fillRect(sx - 20, sy - 10, width, 10);

        ctx.strokeStyle = 'black';
        ctx.strokeRect(sx - 20, sy - 10, 100, 10);
    };

    this.move = function () {
        if (this.stamina !== 0) {
            switch (this.orientation) {
                case ORIENTATION_LEFT:
                    this.tankImage = tankImg2;
                    this.x -= this.speed;
                    this.stamina--;
                    this.checkStamina();
                    break;
                case  ORIENTATION_RIGHT:
                    this.tankImage = tankImg;
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
        let power = Math.floor(Math.sqrt(dx * dx + dy * dy) / 6);
        let dX = this.main.targetX - this.x;
        let dY = this.main.targetY - this.y;
        let alpha = Math.atan2(dY, dX);
        let directionX = Math.cos(alpha);
        let directionY = Math.sin(alpha);
        let bullet_startX = this.x;
        let bullet_startY = this.y;
        let bullet = new Bullet(this.main, bullet_startX, bullet_startY, directionX, directionY, power);
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
