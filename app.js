let input=document.querySelector(".input");
let submit=document.querySelector(".add");
let tasksDiv=document.querySelector(".tasks");

let arrayOfTasks=[];


if(localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}

  getDataFromLocalStorage();

submit.onclick=function (){
    if(input.value!==""){
        addTaskToArray(input.value);
        input.value="";
    }
}


tasksDiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("del")){
         deleteTaskWithId(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task")){

        toggleTaskWithId(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done");
     }
});

function addTaskToArray(taskText){
const task={
    id:Date.now(),
    title:taskText,
    completed:false,
};
arrayOfTasks.push(task);
//console.log(arrayOfTasks)
addElementsToPageFrom(arrayOfTasks);
addDataToLocalStorageFrom(arrayOfTasks);
//console.log(arrayOfTasks);
//console.log(JSON.stringify(arrayOfTasks));
};
function addElementsToPageFrom(arrayOfTasks){
    tasksDiv.innerHTML="";
    arrayOfTasks.forEach((task)=>{
        let div=document.createElement("div");
        div.className="task";
        if(task.completed===true){
            div.className="task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //console.log(div);
        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);
        //console.log(div);
       tasksDiv.appendChild(div); 
    });
}

function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage(){
    let data=window.localStorage.getItem("tasks");
    if (data){
        let tasks=JSON.parse(data);
        //console.log(tasks);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWithId(taskId){
    // for(let i=0; i<arrayOfTasks.length;i++){
    //     console.log(`${arrayOfTasks[i].id}@@ ${taskId}`)
    // }
    arrayOfTasks=arrayOfTasks.filter((task)=>task.id!=taskId)
    addDataToLocalStorageFrom(arrayOfTasks);
}
function toggleTaskWithId(taskId){
     for(let i=0; i<arrayOfTasks.length;i++){
         if(arrayOfTasks[i].id== taskId){
            arrayOfTasks[i].completed==false?(arrayOfTasks[i].completed=true):(arrayOfTasks[i].completed=false);
         }
    }
     addDataToLocalStorageFrom(arrayOfTasks);
}

tasksDiv.innerHTML="";
window.localStorage.removeItem("tasks");