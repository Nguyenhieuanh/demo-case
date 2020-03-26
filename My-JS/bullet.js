let Bullet = function (main, x, y, ) {
    this.main = main;
    this.x = x;
    this.y = y;
    this.radius = RADIUS;
    let count = 0;
    let power = parseFloat(document.getElementById('power').value);
    this.alpha = parseFloat(document.getElementById('alpha').value);
    this.speedX = power * (Math.cos(this.alpha * Math.PI / 180));
    this.speedY = power * (Math.sin(this.alpha * Math.PI / 180));

    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    };

    this.bullet_move = function () {
        this.x += this.speedX * count;
        this.y -= this.speedY * count - 0.5 * GRAVITY * count * count;
        this.speedY += GRAVITY;
        count += 0.01;
    };

    // this.collision = function () {
    //     let tX = this.main.getEnemy().getX();
    //     let tY = this.main.getEnemy().getY();
    //     let dX = Math.abs((this.x + this.radius / 2) - (tX + TANK_WIDTH / 2));
    //     let dY = Math.abs((this.y + this.radius / 2) - (tY + TANK_HEIGHT / 2));
    //     if (dX <= (this.radius + TANK_WIDTH) / 2 && dY < (this.radius + TANK_HEIGHT) / 2) {
    //         return true;
    //     }
    // }
};