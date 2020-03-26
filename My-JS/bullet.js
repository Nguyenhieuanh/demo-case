let Bullet = function (main, bullet_startX, bullet_startY, directionX,directionY, power) {
    this.main = main;
    this.x = bullet_startX;
    this.y = bullet_startY;
    this.radius = RADIUS;
    let count = 0;
    this.speedX = power * directionX;
    this.speedY = power * directionY;

    this.draw = function (alpha) {
        if (!alpha)
            alpha = 255;
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 100, 100," + alpha + ")";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,true);
        ctx.fill();
        ctx.closePath();
    };

    this.bullet_move = function () {
        this.x += this.speedX * count;
        this.y += this.speedY * count - 0.5 * GRAVITY * count * count;
        this.speedY += GRAVITY;
        count += 0.01;
    };
};

