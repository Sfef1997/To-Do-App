

//  Acsses Elements 
const mainInput = document.querySelector(".input");
const submit = document.querySelector(".add");
const tasksDiv = document.querySelector(".tasks");


let ArrayOfTasks =[] ;
// check if local Storage is Empty
if(localStorage.getItem("tasks")){
     ArrayOfTasks =JSON.parse(localStorage.getItem("tasks")); 
};

//  trigger get Data From LocalStorage
getTaskfromStorage();

submit.addEventListener("click",function(){
    if(mainInput.value !==""){
        // Add Task to Array of Tasks
        addTasktoArray(mainInput.value);   
        // make the input Empty
        mainInput.value = "" ; 
    }
});

// click on task Elemet
tasksDiv.addEventListener("click",(e)=>{
    // Removebtn
    if(e.target.classList.contains("del")){
        // Remove Task from localSorage
        deletTask(e.target.parentElement.getAttribute("data-id"))
        // Remove item From page
        e.target.parentElement.remove();
        }
        // Task Elements
        if(e.target.classList.contains("task")){
            // toggel Function
            toggelTask(e.target.getAttribute("data-id"))
            // Toggle Done Class
            e.target.classList.toggle("done")
        }
});
function addTasktoArray (taskText){
 const task ={
    id : Date.now(),
    title :taskText ,
    completed : false ,
 };
    // push task to Array of Tasks
    ArrayOfTasks.push(task);
    // Add TAsk to page
    addEleToPage(ArrayOfTasks);
    // Add tasks to local Storage
    addTaskToStorage (ArrayOfTasks);
}

function addEleToPage(ArrayOfTasks){
    //   Empty the Task Div
    tasksDiv.innerHTML = "";
//  looping of ArrayOfTasks
ArrayOfTasks.forEach((task)=>{
    let div = document.createElement("div")
    div.className = "task" ;
    // check if  Task is Done 
    if(task.completed){
         div.className ="task done";
    }
    div.setAttribute("data-id",task.id);
    div.appendChild(document.createTextNode(task.title)); 
    // make the Remove button
    let removeBtn=document.createElement("span")
    removeBtn.className="del"
    removeBtn.appendChild(document.createTextNode("Delete"))
    //  Append the Remove Span to div
    div.appendChild(removeBtn)
    //  Append the div to the body
    tasksDiv.append(div)

    }); 
}
function addTaskToStorage(ArrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(ArrayOfTasks))
}
function getTaskfromStorage () {
    let data=window.localStorage.getItem("tasks")
    if(data){
       let tasks= JSON.parse(data);
        addEleToPage(tasks)
    }
}
function deletTask(taskId){
    ArrayOfTasks = ArrayOfTasks.filter((task)=>task.id != taskId)
    addTaskToStorage(ArrayOfTasks)
}
function toggelTask(taskId){
     for(let i = 0; i< ArrayOfTasks.length; i++ ){
        if(ArrayOfTasks[i].id == taskId ){
            ArrayOfTasks[i].completed == false ? ArrayOfTasks[i].completed = true : ArrayOfTasks[i].completed = false     
        }
     }
     addTaskToStorage(ArrayOfTasks);
}