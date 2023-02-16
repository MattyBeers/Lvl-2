const complete = 'complete'
const todoForm = document.todoform
//clears values from form after submission
const clearForm = (todoForm) => {
    todoForm.title.value = ''
    todoForm.description.value = ''
    todoForm.imgUrl.value = ''
    todoForm.price.value = ''
}
console.log(todoForm)
// Adds new todo
todoForm.addEventListener("submit", function(event){

    event.preventDefault();

    
    const newToDo = {
        title: todoForm.title.value,
        description: todoForm.description.value,
        imgUrl: todoForm.imgUrl.value,
        price: todoForm.price.value
    };

    
        axios.post("https://api.vschool.io/sydneywhite/todo", newToDo)
        .then(response => {
            clear()
            getData()

            clearForm(todoForm)
        })
        .catch(error => console.log(error.response.data))
})

function clear(){
    const listDiv =document.getElementById("todo-list")
    while(listDiv.firstChild){
        listDiv.removeChild(listDiv.firstChild)
    }
}


// Delete todo
const deleteToDo = (event) => {
    event.preventDefault()
    const id = event.target.parentElement.firstChild.textContent

    axios.delete(`https://api.vschool.io/sydneywhite/todo/${id}`)
        .then(response => { 
            if (response.data.msg === 'Successfully deleted record') {
                event.target.parentElement.remove()
            }
        })
        .catch(error => console.log(error))
};

//marks todo as complete
const completeToDo = event => {
    const target = event.target
    const parentClassList = target.parentElement.classList
    const id = target.parentElement.firstChild.textContent
    
    axios.put(`https://api.vschool.io/sydneywhite/todo/${id}`, {completed: target.checked})
        .then(response => {
            response.data.completed ? parentClassList.add(complete) : parentClassList.remove(complete)
        })
        .catch(error => error)
}

//gets data from api
const getData = () =>{

        axios.get("https://api.vschool.io/sydneywhite/todo")
        .then(response => {
            response.data.map(data => {
                createToDo(data);
            });

        })
        .catch((error) => console.log(error))}

// add todoItem to UI
const createToDo = (data) => {

    // Creates todo item container
    const div = document.createElement('div')
    if (data.completed) div.classList.add('complete')
    div.setAttribute('id', 'todoItem')
    document.getElementById('todo-list').appendChild(div)

    //creates hidden id tag
    const idEl = document.createElement('p');
    idEl.setAttribute('hidden', true)
    idEl.textContent = data._id
    div.appendChild(idEl)

    //creates todo title
    const titleEl = document.createElement('h1')
    titleEl.textContent = `Title: ${data.title}`
    div.appendChild(titleEl)

    // creates checkbox to mark todo as complete 
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = data.completed
    checkBox.addEventListener('click', completeToDo)
    div.appendChild(checkBox)

    // creates todo description
    const descEl = document.createElement('p')
    descEl.textContent = `Description: ${data.description}`
    div.appendChild(descEl)

    // creates todo img
    const imgEl = document.createElement('img')
    imgEl.src = data.imgUrl
    div.appendChild(imgEl)

    //creates todo price
    const priceEl = document.createElement('p')
    priceEl.textContent = `Price: ${data.price}`
    div.appendChild(priceEl)

    //adds delete button for todo item
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener('click', deleteToDo)
    div.appendChild(deleteBtn)
}

getData()


// const newTodo = {
//     title: "My 3rd Todo",
//     price: "1,000",
//     description: "This is my 3rd entry",
//     imgUrl: "https://images.unsplash.com/photo-1569429593410-b498b3fb3387?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
// }


// axios.post("https://api.vschool.io/sydneywhite/todo", newTodo)
//     .then(response => console.log(response.data))
//     .catch(error => console.log(error))
