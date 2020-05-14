let canvas = document.getElementById("canvas");
let ctx= canvas.getContext("2d");
let render;
let obstacle; 
let player;
let pixel;
let maxScore=0;
let count=0;
let newObstacley ;
let gamePaused = false;
let best = JSON.parse(localStorage.getItem('bestscore'));
let jumpSound = new Audio();
let burstSound = new Audio();
jumpSound.src = "jump.wav";
burstSound.src = "burst.flac";


let pauseImage = document.createElement("img");
// pauseImage.src = "pause.png";
let pauseButton = document.getElementById("pause");
pauseButton.appendChild(pauseImage);
pauseButton.addEventListener('click',pauseGame);

canvas.addEventListener('click',jumpAudio);

var score = document.createElement("div");
score.setAttribute("id","score");
document.getElementsByTagName("body")[0].appendChild(score);
score.innerHTML = "Score : 0";

var highScore = document.createElement("div");
highScore.setAttribute("id","highscore");
document.getElementsByTagName("body")[0].appendChild(highScore);

    if(best == null)
       { localStorage.setItem('bestscore','0');
        highScore.innerHTML = "Best Score : 0";
        } 
    else
    {    localStorage.setItem('bestscore',JSON.stringify(best));
        highScore.innerHTML = "Best Score : " + best;
    }

canvas.addEventListener('click', play );
canvas.addEventListener('click', function (){
    player.dy = 5;
});

window.onopen = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setup ();
}

window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setup();
}

window.onload = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setup ();
}

function dispScore(max){
    score.innerHTML ="Score : " + max;
    dispBestScore(max);
}

function dispBestScore(max){
    best = JSON.parse(localStorage.getItem('bestscore'));
    if(max>best)
    {
    localStorage.setItem('bestscore',JSON.stringify(max));
    highScore.innerHTML ="Best Score : " + max;
    }
}

function jumpAudio(){
        jumpSound.play();
}

function burstAudio() {
        burstSound.play();
}

function pauseGame(){
    console.log(1);
    if(!gamePaused)
     {   gamePaused = true;
        clearInterval(render);
        pauseImage.src = "resume.png";
     }
     else if(gamePaused){
        gamePaused = false;
        pauseImage.src = "pause.png";
        render = setInterval(function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            player.jump();
        for(let i=0;i<obstacle.length;i++)
        {    obstacle[i].rotate();
                obstacle[i].burst();
        }
    },16);
    }
}

function  setup (){
    obstacle=new Array();
    player = new PlayerCircle(canvas.width/2,canvas.height/2+ canvas.height*0.3,canvas.height*0.02,'rgb(255,255,255)');
    obstacle.push(new Obstacle(canvas.width/2,canvas.height/3,canvas.height*0.15,'rgb(255,255,255)','#00A4CCFF'));
    maxScore = 0;
    count = 0;
    gamePaused = false;
    player.draw();

for(let i=0;i<obstacle.length;i++)
    obstacle[i].draw();

}

function PlayerCircle (x,y,r,c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    this.dy;
    this.g = 0.25;
    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc (this.x,this.y,this.r,0,Math.PI*2);
        ctx.fill();
    }

    this.jump = function() {
        this.y -= this.dy;
        this.dy -= this.g;
        this.draw();


        if(this.y<=canvas.height/2)
        {
            if(this.y <= canvas.height/3)
            for(let i=0;i<obstacle.length;i++)
            { 
               obstacle[i].y += 1.5;
                obstacle[i].draw();
            }
            else
            for(let i=0;i<obstacle.length;i++)
            { 
               obstacle[i].y += 0.7;
                obstacle[i].draw();
            }
           
        }
        for(let i=0;i<obstacle.length;i++)
        {
            if(this.y <= obstacle[i].y && this.y >= obstacle[i].y - obstacle[i].r)
            {
                if(maxScore<(i+1))
                {
                    count=i+1;
                    maxScore=count;
                    dispScore(maxScore);
                    newObstacley = 3*canvas.height/5;
                    obstacle.push(new Obstacle(canvas.width/2,obstacle[i].y - newObstacley,canvas.height*0.15,'rgb(255,255,255)','#00A4CCFF'));
                   
                }
            }
       
        }
       

    }

}
function Obstacle(x,y,r,c1,c2) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c1 = c1;
    this.c2 = c2;
    this.startAngle=Math.PI/2;

    this.draw = function () {
        ctx.beginPath();
        ctx.strokeStyle = c1 ;
        ctx.arc(this.x,this.y,this.r,this.startAngle,Math.PI+this.startAngle,false);
        ctx.lineWidth=canvas.height/40;
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = c2 ;
        ctx.arc(this.x,this.y,this.r,this.startAngle,Math.PI+this.startAngle,true);
        ctx.lineWidth=canvas.height/40;
        ctx.stroke();
    }

    this.rotate = function () {
        this.startAngle += 1*Math.PI/180;
        this.draw();
    }
    
    this.burst = function () {

        if((player.y - this.y <= (player.r + this.r + canvas.height/40)) && (player.y - this.y >= (this.r - player.r - canvas.height/40)))
        {
            pixel = ctx.getImageData(this.x,this.y + this.r,1,1).data;
            if(!(pixel[0]==255&&pixel[1]==255&&pixel[2]==255))
              {  ctx.clearRect(0,0,canvas.width,canvas.height);
                clearInterval(render);
                    burstAudio();
                canvas.removeEventListener('click',jumpAudio);
                for(var j=0;j<obstacle.length;j++)
                {
                    obstacle[j].draw();
                }
              }

        }

        else if((this.y - player.y <= (player.r + this.r + canvas.height/40)) && (this.y - player.y >= (this.r - player.r - canvas.height/40)))
        {
            pixel = ctx.getImageData(this.x,this.y - this.r,1,1).data;
            if(!(pixel[0]==255&&pixel[1]==255&&pixel[2]==255))
              {  ctx.clearRect(0,0,canvas.width,canvas.height);
                clearInterval(render);                
                burstAudio();
                canvas.removeEventListener('click',jumpAudio);
                for(var j=0;j<obstacle.length;j++)
                {
                    obstacle[j].draw();
                }
              }
        }
    }

}

function play () {
    canvas.removeEventListener('click',play);

         render = setInterval(function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            player.jump();
        for(let i=0;i<obstacle.length;i++)
        {    obstacle[i].rotate();
                obstacle[i].burst();
        }
    },16);

} 