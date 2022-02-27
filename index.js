// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const pendingTasksNumb = document.querySelector(".pendingTasks");
const baseUrl = "https://api.fake.rest/1934694b-2252-4ff7-9bb5-888461548028";
let todoItems = [];
document.addEventListener("DOMContentLoaded", async () => {
  let response = await fetch(`${baseUrl}/getTodos`, {
    method: "GET",
  });

  response = await response.json();
  if (response.success) {
    todoItems = response.data;
    showTasks(todoItems);
  }
});
 /** document.addEventListener("DOMContentLoaded", async () => {
  let response = await fetch(`${baseUrl}/postdata`, {
    method: "POST",
    body: JSON.stringify({title:12})
  });
  response = await response.json();
  if (response.success) {
    todoItems = response.data;
    showTasks(todoItems);
  }

   console.log(response);
 });**/

//   fetch(`${baseUrl}/getTodos`, {
//     method: "GET",
//   })
//     .then((res) => {
//       return res.json();
//     })
//     .then((results) => {
//       if (results.success) {
//         todoItems = results.data;
//         showTasks(todoItems);
//       }
//     });

inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value; //getting user entered value
  if (userEnteredValue.trim() != 0) {
    //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
};
 function addTodoItem(item) {
 //debugger;
 // todoItems.push({ title: item, id: Math.random().toString() });
 
    showTasks(todoItems);
  }
 // inputBox.value = "";
 // showTasks(todoItems);


addBtn.onclick = async () => {
  let response = await fetch(`${baseUrl}/postdata`, {
    method: "POST",
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({"title":inputBox.value}),
  });
  response = await response.json();
  if (response.success) {
    todoItems = response.data;
    console.log(todoItems);
  }
    inputBox.value = "";
  addTodoItem(inputBox.value);

};

function showTasks(data = []) {
  let newList = "";
  data.forEach((item, index) => {
    newList += `<li class="bordered">${item.title}<span class="icon" id=${item.id}>D</span>
    </li><button class ="btn btn-primary updatBtn ${item.id}" onclick="updateBtn('${item.id}')">update</button>`;
  });
  todoList.innerHTML = newList;
  pendingTasksNumb.textContent = data.length;
  data.length > 0
    ? deleteAllBtn.classList.add("active")
    : deleteAllBtn.classList.remove("active");
}

function deleteItem(index) {
 // todoItems.splice(index, 1);
  showTasks(todoItems);
}

todoList.onclick = async (e) => {
  //alert("yes on add btn");
  let response = await fetch(`${baseUrl}/deletebyid/${e.target.id}`, {
  method:"DELETE",
  headers: {
      'content-Type': 'application/json',
    }
   ///  body: ({"id":e}),


 });
   
 
  response = await response.json();
  if (response.success){
    //deleteItem(e.target.id);

   todoItems = response.data;
  }
  //deleteItem(e);
  //if (e.target.classList.contains("icon")) {
    //deleteItem(e.target.id);
  //}
    showTasks(todoItems);
};

  // vv = $(".todoList").find(".updatBtn");
  // console.log(vv);


//   $("p").click(function(){
//   alert("The paragraph was clicked.");
// });

/*async function updateBtn(idd){
    vv = $(".todoList").find("."+idd);
   alert(vv);
   console.log(vv);
// vv.onclick = async (e) => {
  console.log("yes here");
  let response = await fetch(`${baseUrl}/updateid`, {
  method:"PUT",
  headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({"title":inputBox.value}),
  });
  response = await response.json();
  if (response.success) {
    todoItems = response.data;
    console.log(todoItems);
  }
    inputBox.value = "";
  addTodoItem(inputBox.value);
}*/





deleteAllBtn.onclick = async () => {
 let response = await fetch(`${baseUrl}/deleteall`, {
  method:"DELETE"
 });
   
 
  response = await response.json();
  if (response.success){
    todoItems=[];
  }
  showTasks();
};
