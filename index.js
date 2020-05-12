var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx= canvas.getContext("2d");
var render;
var obstacle = []; 

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function PlayerCircle (x,y,r,c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    this.dy = 5;
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

        // if(this.y<=canvas.height/2)
        // for(var i=0;i<obstacle.length;i++)
        // {    obstacle[i].y+=0.5;
        //     obstacle[i].draw();
        // }
    }

    // this.burst = function() {
    //     for(var i =0 ;i<obstacle.length;i++)
    //    {    
    //        if(this.y - this.radius <= obstacle[i].y + obstacle[i].r + 5 && this.y - this.radius >= obstacle[i].y - obstacle[i].r - 5)
    //       { 
    //           var pixel = ctx.getImageData(obstacle[i].x,obstacle[i].y+ obstacle[i].r,2,2).data;
    //        console.log(pixel);
    //        clearInterval(render);
    //       }
    //       else
    //       {
    //           console.log("hit");
    //           clearInterval(render);
    //       }

    //             // if(!(pixel[0]==255&&pixel[1]==0&&pixel[2]==0))
    //             //     continue;
    //             // else{
    //             //     ctx.clearRect(0,0,canvas.width,canvas.height);
    //             //     clearInterval(render);
    //             // }
    //    }
    // }

}
function Obstacle(x,y,r,c1,c2) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c1 = c1;
    this.c2 = c2;
    this.startAngle=Math.PI/2;

    this.draw = function () {
        ctx.linewidth=canvas.height/40;
        ctx.beginPath();
        ctx.strokeStyle = c1 ;
        ctx.arc(this.x,this.y,this.r,this.startAngle,Math.PI+this.startAngle,false);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = c2 ;
        ctx.arc(this.x,this.y,this.r,this.startAngle,Math.PI+this.startAngle,true);
        ctx.stroke();
    }

    this.rotate = function () {
        this.startAngle += 1*Math.PI/180;
        this.draw();
    }
    
    this.burst = function () {

        console.log(player.r + this.r);
       
        if(((player.y-this.y) <= (player.r + this.r + canvas.height/80)) && ((player.y-this.y) >= (this.r - player.r - canvas.height/80)))
            console.log("pass");
        else 
        {
            console.log("hit");
            clearInterval(render);
        }
    
    }

}

var player = new PlayerCircle(canvas.width/2,canvas.height -20,canvas.height*0.02,'red');
obstacle.push(new Obstacle(canvas.width/2,canvas.height/2 + 80,canvas.height*0.15,'red','blue'));
obstacle.push(new Obstacle(canvas.width/2,canvas.height/2 - 100,canvas.height*0.15,'red','blue'));
player.draw();

for(var i=0;i<obstacle.length;i++)
    obstacle[i].draw();

canvas.addEventListener('click', play );
canvas.addEventListener('click', function (){
    player.dy = 5;
});

function play () {
         render = setInterval(function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
        player.jump();
        for(let i=0;i<obstacle.length;i++)
        {    obstacle[i].rotate();
                obstacle[i].burst();
        }
    },16);

    canvas.removeEventListener('click',play);
}