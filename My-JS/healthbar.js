let drawHealthBar = function (x, y, width, height, health, max_health) {
    if (health >= max_health) {
        health = max_health;
    }
    if (health <= 0) {
        health = 0;
    }
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, y, width, height);
    let colorNumber = Math.round((1 - (health / max_health)) * 0xff) * 0x10000 + Math.round((health / max_health) * 0xff) * 0x100;
    let colorString = colorNumber.toString(16);
    if (colorNumber >= 0x100000) {
        ctx.fillStyle = '#' + colorString;
    } else if (colorNumber << 0x100000 && colorNumber >= 0x10000) {
        ctx.fillStyle = '#0' + colorString;
    } else if (colorNumber << 0x10000) {
        ctx.fillStyle = '#00' + colorString;
    }
};