// основные элементы
const input = document.querySelector('.input')
const button = document.querySelector('.button')
const taskList = document.querySelector('.task-list')
const myStorage = window.localStorage

// логическая часть (состояние, state)
let taskStorage = myStorage.getItem('tasks')
const tasks = [...JSON.parse(taskStorage)]


// функции взаимодействия с логической частью (состоянием)
const editTask = (elem, input) => {
    elem.edit = !elem.edit
    if (!elem.edit) {
        elem.task = input.value
    }
    myStorage.setItem('tasks', JSON.stringify(tasks))
    render(tasks)
}

const deleteTask = (arr, index) => {
    if (confirm('Вы точно хотите удалить?')) {
        arr.splice(index, 1)
    }
    myStorage.setItem('tasks', JSON.stringify(tasks))
    render(tasks)
}

button.addEventListener('click', () => {
    tasks.push({ task: input.value, edit: false })
    myStorage.setItem('tasks', JSON.stringify(tasks))
    render(tasks)
})


// функция рендера
const render = (arr) => {
    taskList.innerHTML = ''
    arr.forEach((elem, index) => {
        const li = document.createElement('li')
        const div = document.createElement('div')
        const p = document.createElement('p')
        const buttonEdit = document.createElement('button')
        const buttonDel = document.createElement('button')
        const input = document.createElement('input')

        if (elem.edit) {
            input.value = elem.task
            buttonEdit.innerHTML = 'Save'
            li.append(input)
            input.classList.add('inputSave')
        } else {
            p.innerHTML = elem.task
            buttonEdit.innerHTML = 'Edit'
            li.append(p)
            p.classList.add('p')
        }

        buttonDel.innerHTML = 'Delete'
        li.classList.add('list-item')

        div.append(buttonEdit)
        buttonEdit.classList.add('edit')
        div.append(buttonDel)
        buttonDel.classList.add('del')

        li.append(div)

        buttonDel.addEventListener('click', () => deleteTask(arr, index))
        buttonEdit.addEventListener('click', () => editTask(elem, input))

        taskList.append(li)
    })
}

render(tasks)