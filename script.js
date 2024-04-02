const TASKLIST = [
  // {
  //   taskContent: "book tickets for leo",
  //   taskStatus: "InCompleted",
  //   taskPriority: "high",
  //   taskId: 1,
  // },
  // {
  //   taskContent: "gym",
  //   taskStatus: "InCompleted",
  //   taskPriority: "high",
  //   taskId: 2,
  // },
  // {
  //   taskContent: "post answers for questions",
  //   taskStatus: "InCompleted",
  //   taskPriority: "low",
  //   taskId: 3,
  // },
  // {
  //   taskContent: "post answers",
  //   taskStatus: "InCompleted",
  //   taskPriority: "low",
  //   taskId: 4,
  // }
];

function addNewTask() {
  if(document.getElementById("taskContent").value != ""){
  let taskDescription = document.getElementById("taskContent").value;
  let taskPriority = document.getElementById("taskPriority").value;
  TASKLIST.push({ taskContent: taskDescription, taskStatus: "InCompleted", taskPriority: taskPriority, taskId: TASKLIST.length + 1 });
  addElement(TASKLIST);
  }
}

function deleteTask(str){
  for (let i = 0; i < TASKLIST.length; i++) {
    if (str == TASKLIST[i].taskContent){
      TASKLIST.splice(i, 1);
      break;
    }
  }
  addElement(TASKLIST);
}

function editTask(str) {
  document.getElementById("taskContent").value = str;
  deleteTask(str);
  document.getElementById("taskContent").value = str;
}

function filterTasklist(){
  let filtervalue = document.getElementById("fil").value;
  let filtered = [];

  filtered = TASKLIST.filter(function(task) {
      return task.taskStatus === filtervalue;
  })

  if(filtered.length==0){
    filtered = TASKLIST.filter(function(task) {
        return task.taskPriority === filtervalue;
    })
  }

  addElement(filtered);
  if (filtervalue=='all') addElement(TASKLIST);
}

function chekd(id,str){
  for (let i = 0; i < TASKLIST.length; i++) {
    if (str == TASKLIST[i].taskContent && id.checked){
      TASKLIST[i].taskStatus = "Completed";
    }
  }
  addElement(TASKLIST);
}

function deleteAllTasks() {
  TASKLIST.length = 0;
  addElement(TASKLIST);
}

function addElement(TASKLIST) {
  let str = "";
  let st = "";
  for (let i = 0; i < TASKLIST.length; i++) {
    const task = TASKLIST[i];
    const taskStyle = task.taskStatus === "Completed" ? 'text-decoration: line-through;' : '';
    const checkboxStyle = task.taskStatus === "Completed" ? 'display: none;' : '';
    if(task.taskStatus == "Completed"){
    str += `<div class="task" style="${taskStyle}">
      <input type="checkbox" name="check" style="${checkboxStyle} onclick="chekd(this,'${task.taskContent}')">
      <label for="check">${task.taskContent}</label>
      <button class="edit" onclick="editTask('${task.taskContent}')">Edit</button>
      <button class="delete" onclick="deleteTask('${task.taskContent}')">Delete</button>
    </div>`;
    }
    else{
      st += `<div class="task">
        <input type="checkbox" name="check" onclick="chekd(this,'${task.taskContent}')">
        <label for="check">${task.taskContent}</label>
        <button class="edit" onclick="editTask('${task.taskContent}')">Edit</button>
        <button class="delete" onclick="deleteTask('${task.taskContent}')">Delete</button>
      </div>`;
      }
  }

  document.getElementById("taskContent").value = "";
  document.getElementById("taskList").innerHTML = st+str;
}

addElement(TASKLIST);