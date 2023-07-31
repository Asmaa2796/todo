// declare vars
var addInput = document.querySelector(".add-input");
var add = document.querySelector(".add");
var tasks = document.querySelector(".tasks");
var tasksContent = document.querySelector(".tasks-content");
var tasksCount = document.querySelector(".tasksCount");
var finishedTasks = document.querySelector(".finishedTasks");
var actions = document.querySelector(".actions");
var finAll = document.querySelector(".finAll");

add.addEventListener("click", addTask);

// add task
function addTask() {

  // check if input is empty
  if (addInput.value === "" || addInput.value.match(/^\s*$/)) {
    Swal.fire("Please add new task");
  } 
  
  else {

    // add task
    var noTasks = document.querySelector(".no-tasks");
    if (document.body.contains(document.querySelector(".no-tasks"))) {
      noTasks.remove();
    }

    var li = document.createElement("li");
    var text = document.createElement("div");
    text.classList = "text";
    text.innerHTML = addInput.value;
    li.appendChild(text);

    // add delete span
    var del = document.createElement("span");
    del.innerHTML = "×";
    del.className = "delete";
    li.appendChild(del);

    // append to tasks list
    tasks.appendChild(li);

    // display actions
    actions.style.display = 'block';

    // empty field & focus
    addInput.value = "";
    addInput.focus();

    calculateTasks();
    // saveData();
  }
}

tasks.addEventListener("click", deleteTask);
// delete task
function deleteTask(e) {
  if (e.target.classList.contains("delete")) {
    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        var li = e.target.parentElement;
        tasks.removeChild(li);

        // check tasks count
        if (tasks.childElementCount == 0) {
          createNoTasks();
          // hide actions
          actions.style.display = "none";
          // calculate tasks
          calculateTasks();

          Swal.fire("Deleted!");
        //   saveData();
        }

        
      }
    });


  }

  // check class for finished tasks
  else if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    calculateTasks();
    // saveData();
  }
}

// delete all
var delAll = document.querySelector(".delAll");
delAll.addEventListener('click',deleteAll);

function deleteAll() {
    Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete all!",
      }).then((result) => {
        if (result.isConfirmed) {
          var allTasks = document.querySelector('.tasks');
          allTasks.innerHTML = '';
  
          // check tasks count
          if (tasks.childElementCount == 0) {
            createNoTasks();
            // hide actions
            actions.style.display = "none";
          }
  
          // calculate tasks
          calculateTasks();

          Swal.fire("Deleted!");
        //   saveData();
        }
      });
}
// finish all
var finAll = document.querySelector(".finAll");
finAll.addEventListener('click',finishAll);

function finishAll() {
    Swal.fire({
        title: "Are you sure?",
        text: "",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, finish all!",
      }).then((result) => {
        if (result.isConfirmed) {
          var task = document.querySelectorAll('.tasks li');
          task.forEach((el) => {
            el.classList.add('checked');
          });
          
  
          // calculate tasks
          calculateTasks();

          Swal.fire("Finished!");
        //   saveData();
        }
    });
}

// create no tasks div
function createNoTasks() {
  var noTask = document.createElement("div");
  noTask.className = "no-tasks";

  var img = document.createElement("img");
  img.setAttribute("src", "images/notasks.gif");

  var b = document.createElement("b");
  b.innerHTML = "No tasks yet";

  noTask.appendChild(img);
  noTask.appendChild(b);

  document.querySelector(".tasks-content").appendChild(noTask);
}

// calculate tasks
function calculateTasks() {
    tasksCount.innerHTML = document.querySelectorAll('.tasks li').length;
    finishedTasks.innerHTML = document.querySelectorAll('.tasks .checked').length;
}

// save data to local storage
// function saveData() {
//     window.localStorage.setItem('tasks',tasks.innerHTML);
// }
// get data from local storage
// function getData() {
//     tasks.innerHTML = window.localStorage.getItem('tasks');
// }

// getData();
