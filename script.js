// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)

// Step 2: click a task to toggle the "done" class

// Step 3: delete with the x button (one listener on the ul - event delegation)

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)

// Step 6: Clear completed

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")



let form = document.getElementById("task-form");
let taskInput = document.getElementById("task-input");
let prioritySelect=document.getElementById("priority-select");
let taskList=document.getElementById("task-list");
let error=document.getElementById("error");
let left=document.getElementById("left")
let filters=document.getElementById("filters");
let clearDone=document.getElementById("clear-done");
let empty=document.getElementById("empty")

form.addEventListener("submit",function(event){
    event.preventDefault();
    let taskText=taskInput.value.trim();
    if(taskText=="")
    {
        error.hidden=false;
        error.textContent="Please type a task"

    }
    else
    {
        error.hidden=true
        let li = document.createElement("li");
        let priority=prioritySelect.value;
        li.classList.add(`priority-${priority}`);
        let span=document.createElement("span");
        span.classList.add("text");
        span.textContent=taskText;
        let button=document.createElement("button");
        button.textContent="x";
        button.classList.add("delete")
        li.appendChild(span);
        li.appendChild(button);
        taskList.appendChild(li);
        taskInput.value=""
        taskInput.focus();
        let leftTask=updateCounter();
        left.textContent=leftTask
        
        let activeButton = filters.querySelector("button.active");
        if (activeButton.dataset.filter === "done")
        {
            li.hidden=true;
        }
        updateEmptyMessage()
    
    }
   

});

taskList.addEventListener("click",function(event){
let li = event.target.closest("li");
if(event.target.classList.contains("delete"))
{
    li.remove();
    let leftTask=updateCounter();
    left.textContent=leftTask
    updateEmptyMessage()
}
else

{
    if (li !== null) {
    li.classList.toggle("done");
    let leftTask=updateCounter();
    left.textContent=leftTask
}
}
})
    

function updateCounter()
{
    return taskList.querySelectorAll("li:not(.done)").length;
}

filters.addEventListener("click",function(event)
{

    let buttons = filters.querySelectorAll("button");
        buttons.forEach(function(button)
        {
            if(event.target===button)
            {
                button.classList.add("active")
            }
            else{
                button.classList.remove("active")
            }
        })

    if(event.target.dataset.filter=="active")
    {
        let activeTask= taskList.querySelectorAll("li:not(.done)")
        activeTask.forEach(function(li)
        {
            li.hidden=false
        })
        let doneTask= taskList.querySelectorAll("li.done")
        doneTask.forEach(function(li)
        {
            li.hidden=true
        })
        
    }
    else if (event.target.dataset.filter=="done"){
        let doneTask= taskList.querySelectorAll("li.done")
        doneTask.forEach(function(li)
        {
            li.hidden=false;
        })
         let activeTask= taskList.querySelectorAll("li:not(.done)")
        activeTask.forEach(function(li)
        {
            li.hidden=true;
        })

    }
    else if(event.target.dataset.filter=="all")
    {
        let allTask= taskList.querySelectorAll("li")
         allTask.forEach(function(li)
        {
            li.hidden=false;
        })

    }

});

clearDone.addEventListener("click",function()
{
    let doneTask= taskList.querySelectorAll("li.done");
    doneTask.forEach(function(task)
{
    task.remove()
})
    updateEmptyMessage()

})

function updateEmptyMessage() {
let numOfTask=taskList.querySelectorAll("li").length;
if(numOfTask==0)
{
    empty.hidden=false;
}
else{
    empty.hidden=true
}
}