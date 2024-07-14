const firebaseConfig = {
  apiKey: "AIzaSyAY4PetLO3GhB5hE1_VPd7USfnPipZXl-k",
  authDomain: "todoapp-7579a.firebaseapp.com",
  databaseURL: "https://todoapp-7579a-default-rtdb.firebaseio.com",
  projectId: "todoapp-7579a",
  storageBucket: "todoapp-7579a.appspot.com",
  messagingSenderId: "380977434806",
  appId: "1:380977434806:web:93da309594253d2d5c9617"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
const todoRef = firebase.database().ref("todo");

// Get the UL element
var ulElement = document.getElementById("list");

// Listen for child added events
todoRef.on("child_added", (snapshot) => {
  var data = snapshot.val();
  var key = snapshot.key;

  var liElement = document.createElement("li");
  var liText = document.createTextNode(data.value);
  liElement.setAttribute("class", "list-group-item");
  liElement.setAttribute("data-key", key);
  liElement.appendChild(liText);

  // Update button
  var updateBtn = document.createElement("button");
  updateBtn.innerHTML = " ";
  updateBtn.setAttribute("class", "bx bx-edit btn btn-primary");
  updateBtn.setAttribute("onclick", "updateItem(this)");
  updateBtn.setAttribute("title", "Yes You Can Update");
  liElement.appendChild(updateBtn);

  // Delete button
  var deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = " ";
  deleteBtn.setAttribute("class", "bx bxs-trash-alt btn btn-danger");
  deleteBtn.setAttribute("onclick", "deleteItem(this)");
  deleteBtn.setAttribute("title", "Delete Item");
  liElement.appendChild(deleteBtn);

  ulElement.appendChild(liElement);
});

function addTodo() {
  var inputField = document.getElementById("input_field");
  var inputValue = inputField.value.trim();

  if (inputValue !== "") {
    var key = todoRef.push().key;
    var obj = {
      value: inputValue,
      key: key
    };

    todoRef.child(key).set(obj);
    inputField.value = "";
  }
}

function deleteItem(btn) {
  var li = btn.parentNode;
  var key = li.getAttribute("data-key");

  todoRef.child(key).remove();
  li.remove();
}

function updateItem(btn) {
  var li = btn.parentNode;
  var key = li.getAttribute("data-key");
  var newValue = prompt("Enter Updated Value", li.firstChild.nodeValue.trim());

  if (newValue !== null && newValue.trim() !== "") {
    todoRef.child(key).update({ value: newValue.trim() });
    li.firstChild.nodeValue = newValue.trim();
  }
}

function deleteAll() {
  ulElement.innerHTML = "";
}
