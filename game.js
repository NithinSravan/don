var numArray= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
var container = document.getElementsByClassName("container")[0];


for(var i=0;i<20;i++)
{
    const myDiv = document.createElement('div');
    container.appendChild(myDiv);
    myDiv.classList.add("box");
    console.log(myDiv);
}
numberDisplay();
function numberDisplay(){
//function to display numbers on grid
for(var i=0;i<20;i++)
    var num= document.getElementsByClassName("box")[i];
    var para =document.createElement("p");
    var text =document.createTextNode(numArray[i+1]);
    para.appendChild(text);
    num.appendChild(para);
}

function numberChange(){
//function to change numbers on grid
}

const box =document.querySelector("box");

box.addEventListener('click',numberChange);

