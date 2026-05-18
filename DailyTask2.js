let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function addTask(){

  let text = document.getElementById("task").value;
  let priority = document.getElementById("priority").value;

  if(text==""){
    alert("Enter Task");
    return;
  }

  tasks.push({
    title:text,
    priority:priority,
    completed:false,
    date:new Date().toLocaleDateString()
  });

  localStorage.setItem("tasks",JSON.stringify(tasks));

  document.getElementById("task").value="";

  display();
}

function display(){

  let list = document.getElementById("list");
  list.innerHTML="";

  let data = tasks.filter(task=>{
    if(filter=="pending") return !task.completed;
    if(filter=="completed") return task.completed;
    return true;
  });

  data.forEach((task,index)=>{

    list.innerHTML += `
    <div class="task ${task.completed ? 'done':''}">
    
    <input type="checkbox"
    ${task.completed ? 'checked':''}
    onchange="completeTask(${index})">

    <b>${task.title}</b>
    <p class="${task.priority.toLowerCase()}">
    ${task.priority}
    </p>

    <small>${task.date}</small>

    <br><br>

    <button onclick="deleteTask(${index})">
    Delete
    </button>

    </div>
    `;
  });

  countTask();
}

function completeTask(index){
  tasks[index].completed=!tasks[index].completed;

  localStorage.setItem("tasks",JSON.stringify(tasks));

  display();
}

function deleteTask(index){

  tasks.splice(index,1);

  localStorage.setItem("tasks",JSON.stringify(tasks));

  display();
}

function showTask(type){
  filter=type;
  display();
}

function countTask(){

  let total = tasks.length;

  let pending = tasks.filter(
    task => !task.completed
  ).length;


}

display();