console.log('JS is sourced!');

getToDO()

function getToDO() {
    axios({
        method: 'GET',
        url: '/todos'
    })
    .then((response) => {
        renderList(response.data)
    })
    .catch((error) => {
        console.log('ERROR', error)
    })
}

function renderList(todos) {
    let toDoList = document.getElementById('to-do-list')
    toDoList.innerHTML = ''

    for (let to of todos) {
        if (to.isComplete === false) {
            toDoList.innerHTML += `
            <tr data-testid="toDoItem>
                <td>${to.text}$</td>
                <td>
                    <button data-testid="completeButton" onclick="markTaskComplete(${todo.id})">Complete</button>
                </td>`
        }


    }
}

function addTodos() {
    event.preventDefault()
    let todosText = document.getElementById("todoText").value 

    axios({
        method: "POST",
        url: "/todos",
        data: {}
    })
    .then

}