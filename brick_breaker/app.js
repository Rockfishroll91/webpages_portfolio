console.log("Hello World!"); var canvas = document.querySelector("canvas"); var c = canvas.getContext("2d"); var bricks = []; var position = {x: canvas.width / 2 - 50,y: canvas.height - 20}; var moveLeft = false; var moveRight = false;
var playGame = false; var incY = 6; var incX = 0;  var ammoPos = {x: canvas.width / 2 - 10, y: 660}
function Brick(x, y, h, w) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;

    this.draw = function() {
        c.beginPath();
        c.rect(this.x, this.y, this.w, this.h);
        c.fillStyle = "blue";
        c.strokeStyle = "black";
        c.lineWidth = 1
        c.fill();
        c.stroke();
        c.closePath();
    }
}

function init() {
    for(j=0;j<125;j+=25) {
        for(i=0;i<700;i+=50) {
            bricks.push(new Brick(i, j, 25, 50))
        }
    }
   
} init();

function drawBreaker() {
    c.beginPath();
    c.rect(position.x, canvas.height - 20, 100, 20);
    c.strokeStyle = "black";
    // c.lineWidth = 5;
    c.stroke();
    c.closePath();
}

function drawAmmo() {
    c.beginPath();
    c.rect(ammoPos.x, ammoPos.y, 20, 20);
    c.strokeStyle = "black";
    c.stroke();
    c.closePath();
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(i=0;i<bricks.length;i++) {
        bricks[i].draw();
    }
    drawBreaker();
    drawAmmo();
    if(moveLeft && position.x > 0) {
        position.x -= 4;
    }
    if(moveRight && position.x < 600) {
        position.x += 4;
    }
    if(playGame) {
        ammoPos.y -= incY;
        ammoPos.x += incX;
        if(ammoPos.x + 20 > 700 || ammoPos.x <=0) {
            incX = -incX;
        }
        if(ammoPos.y <=0) {
            incY = -incY;
        }
        if(ammoPos.y >= 680) {
            incY = 0;
            incX = 0;
        }
        for(i=0;i<bricks.length;i++) {
            if(ammoPos.y >= bricks[i].y && ammoPos.y <= bricks[i].y + 25) {
                if(ammoPos.x <= bricks[i].x + 50 && ammoPos.x + 20 >= bricks[i].x) { 
                    incY = -incY;
                    bricks.splice(i, 1);
                }
            }
        }
        if(ammoPos.y + 20 === position.y && ammoPos.x + 20 - position.x >= 0 && ammoPos.x - position.x <= 100) {
            incY = -incY;
            if(ammoPos.x + 20 - position.x <= 40) {
                incX = -3;
            }
            if(ammoPos.x - position.x >= 60) {
                incX = 3;
            }
            if(ammoPos.x - position.x > 40 && ammoPos.x - position.x < 60) {
                incX = 0;
            }
        }
    }
} animate();

document.onkeydown = function(e) {
    if(e.key === "a") {
        moveLeft = true;
    }
    if(e.key === "d") {
        moveRight = true;
    }
    if(e.key === " ") {
        if(!playGame) {
            playGame = true;
        } else {
            playGame = false;
        }
    }
}
document.onkeyup = function(e) {
    if(e.key === "a") {
        moveLeft = false;
    }
    if(e.key === "d") {
        moveRight = false;
    }
}