var numArray =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
let newArray = shuffle(numArray);
var time = 3;
var finish=0;
var container = document.getElementById("container");
const countBox=document.createElement('div');
container.appendChild(countBox);
container.addEventListener('click',startCountDown);
var count=1;
var text;
var interval;
var number = document.getElementsByClassName("box");
var block= document.getElementsByClassName("number");
var res = document.getElementById("reset");
res.addEventListener('click',function(){
    setup();
});
var stimer= document.getElementsByClassName("stimer");
var mstimer= document.getElementsByClassName("mstimer");

setup();
    function setup()
    {
        var startText= document.createElement("p");
        startText.innerHTML="Click to Start!"
        startText.classList.add("clickText");
        container.appendChild(startText);

    }

//calling counting 3,2,1.... function
    function startCountDown(){
        interval=setInterval(countDown,1000);
    }

//counting 3,2,1... function
    function countDown(){
        countBox.innerHTML=time+"...";
        time--;
        container.removeEventListener('click',startCountDown);
        if (time<0)
            stopCountDown();
    }
    
    function stopCountDown(){
        clearInterval(interval);
        container.removeChild(startText);
        container.removeChild(countBox);
        stopWatch();
        display();
        event();
    }

//displaying grid and numbers
    function display(){
        for(var i=0;i<20;i++)
        {
  
        const myDiv=document.createElement('div');
        container.appendChild(myDiv);
        myDiv.classList.add("box");
        const para =document.createElement("p");
        para.innerHTML=newArray[i];
        para.classList.add("number");
        myDiv.appendChild(para);
        console.log(myDiv);
    
        }
    }
//shuffle given array till 20
    function shuffle(arr){
     for (var i=20-1;i>0;i--)
        {
         j= Math.floor(Math.random()*(i+1));
         [arr[j],arr[i]]=[arr[i],arr[j]];
        }
     return arr;
    }   

//click function
    function event(){
        for(let i=0;i<20;i++){
            number[i].addEventListener('click',function(){
                
                if((parseInt(block[i].innerHTML)===count)&&20+count<=40)
                {
                    block[i].innerHTML=20+count;
                    count++;
                }
                else if(parseInt(block[i].innerHTML)==count)
                {
                    block[i].innerHTML="";
                    count++;
                }
                if(count==40)
                    finish =1;
            });
        }   
    }

//resetting function, calling startCountDown()
    function reset(){
            startCountDown();
    }

//timer function
    function stopWatch()
    {
	s = 0;
	ms = 0;
	var initial = Date.now();
	var curr;
	var timer = setInterval(function ()
	{
		if (finish!=1)
		{
			curr = Date.now();
			diff = curr- initial;
			s = Math.floor(diff / 1000);
			ms = diff - (Math.floor(diff / 1000) * 1000);
			stimer.innerHTML = s;
			    if (Math.floor(ms / 10) === 0)
			    {
				mstimer.innerHTML = '00' + ms;
			    }
			    else if (Math.floor(ms / 100) === 0)
			    {
				mstimer.innerHTML = '0' + ms;
			    }
			    else
				mstimer.innerHTML = ms;
		}
		else
		{
			clearInterval(timer);
		}

	}, 1);

    }
    
       