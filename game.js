var container = document.getElementsByClassName("container")[0];

for(var i=0;i<20;i++)
{
    const myDiv = document.createElement('div');
    container.appendChild(myDiv);
    myDiv.classList.add("box");
    console.log(myDiv);
}
