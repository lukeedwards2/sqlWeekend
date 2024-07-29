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

    for (let do of todos) {
        
    }
}