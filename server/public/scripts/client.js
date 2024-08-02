console.log('JS is sourced!');

function render(todos) {
    let location = document.getElementById("to-do-table-body");
    location.innerHTML = "";
  
    for (let okay of todos) {
      if (okay.isComplete === false) {
        location.innerHTML += `
              <tr data-testid="toDoItem">
                  <td>${okay.text}</td>
                  <td>
                      <button data-testid="completeButton" onclick="markTaskComplete(${okay.id})">Complete</button>
                  </td>
                  <td>
                      <button data-testid="deleteButton" onclick="deleteButton(${okay.id})">❌</button>
                  </td>
              </tr>
          `
      } else {
        location.innerHTML += `
          <tr data-testid="toDoItem" class="completed">
                  <td>${okay.text}</td>
                  <td></td>
                  <td>
                      <button data-testid="deleteButton" onclick="deleteButton(${okay.id})">❌</button>
                  </td>
              </tr>
          `
      }
    }
  }
  
  function fetch() {
    axios({
      method: "GET",
      url: "/todos",
    })
      .then((response) => {
        render(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }
  
  function submitTask(event) {
    event.preventDefault()
  
    let task = {
      text: document.getElementById("taskIn").value,
    };
  
    axios({
      method: "POST",
      url: "/todos",
      data: task,
    })
      .then((response) => {
        clearForm();
        console.log("This is our POST response", response)
        fetch()
      })
      .catch((error) => {
        console.log("Error", error)
      });
  }

  
  function clearForm() {
    document.getElementById("taskIn").value = ""
  }
  
  
function markTaskComplete(todoId) {
    axios({
      method: "PUT",
      url: `/todos/${todoId}`,
    })
      .then(function (response) {
        fetch();
      })
      .catch(function (err) {
        alert("ERROR");
      });
  }


  function deleteButton(todoId) {
    console.log("todoId is:", todoId)
    axios({
      method: "DELETE",
      url: `/todos/${todoId}`,
    })
      .then((response) => {
        fetch();
      })
      .catch((err) => {
        console.log("ERROR", err)
      });
  }
  
  fetch();