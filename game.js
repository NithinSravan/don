var numArray =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var time = 3;
var container = document.getElementById("container");
 const countBox=document.createElement('div');
 container.appendChild(countBox);
    var count=1;
    var text;
    countDown();
    var interval = setInterval(countDown,1000);
    function countDown(){
        countBox.innerHTML=time+"...";
        time--;
        if (time==0)
            stopCountDown();
    }
    
    function stopCountDown(){
        clearInterval(interval);
        container.removeChild(countBox);
        display();
        //event();
    }

    let newArray = shuffle(numArray);
 
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

    function shuffle(arr){
     for (var i=arr.length-1;i>0;i--)
     {
         j= Math.floor(Math.random()*(i+1));
         [arr[j],arr[i]]=[arr[i],arr[j]];
     }
     return arr;
}
var number = document.getElementsByClassName("box");
    function event(){
        for(var i=0;i<20;i++){
            number[i].addEventListener('click',numberChange(i));
    }
}
var block= document.getElementsByClassName("number");
    function numberChange(i){
      
        if(parseInt(block[i].innerHTML)===count)
        {
            block[i].innerHTML=20+count;
            count++;
        }
    }
    
       