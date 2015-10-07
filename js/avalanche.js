var cnv, ctx, screenWidth, screenHeight;

var pedras = Array();
var idPedra = 0;
var timer = 0;
var fps = 60;
var countUnlockPedras = 0;

function resetSizes() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    cnv.setAttribute("width", screenWidth);
    cnv.setAttribute("height", screenHeight);
}

window.onload = function() {
    cnv = document.getElementById("avalanche");

    resetSizes();

    ctx = cnv.getContext("2d");
    
    criaPedras();
    
    animate();
};

function draw() {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    
    timer++;
    
    for(var i = 0; i < pedras.length; i++) {
        ctx.save();
        
        if(pedras[i].lck === false){
            pedras[i].y+=2;
        }
        
        ctx.translate(pedras[i].x,pedras[i].y);

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0,0,10,10);

        ctx.restore();
    }
    
    if(timer % 10 === 0){
        unlockPedras();
    }
}

function criaPedras(){
    
    for(var j = 0; j < 3; j++){
        for(var i = 2; i < (screenWidth - 12); i += 12) {
            pedras.push({id: idPedra, x: i, y: j * 12, line: j, lck: true});
            idPedra++;
        }
    }
}

function unlockPedras(){
    var lineCount = pedras.length / 3;
    var startIndex = 0;
    
    if(countUnlockPedras <= lineCount){
        startIndex = lineCount * 2;
    } else if(countUnlockPedras <= lineCount * 2){
        startIndex = lineCount;
    } else {
        startIndex = 0;
    }
    
    var index = getRandomInt(startIndex,pedras.length - 1);
    pedras[index].lck = false;
    countUnlockPedras++;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onresize = function() {
    resetSizes();
    animate();
};

function animate() {
    requestAnimFrame(animate);
    draw();
}

window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / fps);
        };
})();
