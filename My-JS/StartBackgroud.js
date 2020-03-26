let canvasBg = document.getElementById('new_game');
let ctxBg = canvasBg.getContext('2d');
ctxBg.drawImage(NEW_GAME_BG,0,0,1000,500);

let mouseX = 0;
let mouseY = 0;
let btnPlay = new Button(462, 550,378, 446);

function Button(xL, xR, yT, yB) {
    this.xLeft = xL;
    this.xRight = xR;
    this.yTop = yT;
    this.yBot = yB;

    this.checkClicked = function () {
        if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBot)
            return true;
    }
}

function mouseClk(e) {
    mouseX = e.pageX - canvas.offsetLeft;
    mouseY = e.pageY - canvas.offsetTop;
    console.log(mouseX,mouseY);
    if (btnPlay.checkClicked()) {
        canvas.style.display = 'block';
        canvasBg.style.display = 'none';
    }
}


