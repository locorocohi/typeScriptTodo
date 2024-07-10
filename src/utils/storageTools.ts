export const addUpdatedTodosInStorage = (key, arrayToAdd) => {
    window.localStorage.setItem(key, JSON.stringify(arrayToAdd))
}

export const parseStorageToArray = (key) => {
    return JSON.parse(window.localStorage.getItem(key))
}

export const completeAllInStorage = () => {
    const parsedTodos = parseStorageToArray('todos')
    if (parsedTodos) {
        const isSomeTasksCompleted = parsedTodos.some(item => !item.completed);
        const updatedTodos = parsedTodos.map(item => ({...item, completed: isSomeTasksCompleted }));
        addUpdatedTodosInStorage('todos', updatedTodos)
    }
}

export const deleteCompletedInStorage = () => {
    const parsedTodos = parseStorageToArray('todos')
    if (parsedTodos) {
        const updatedTodos = parsedTodos.filter(item => !item.completed)
        addUpdatedTodosInStorage('todos', updatedTodos)
    }
}

export const addCurrentTaskInStorage = (task) => {
    const parsedTodos = parseStorageToArray('todos')
    const todosWithNewItem = parsedTodos ? [...parsedTodos, task] : [task]
    addUpdatedTodosInStorage('todos', todosWithNewItem)
}

export const deleteTaskInStorage = (id) => {
    const parsedTodos = parseStorageToArray('todos')
    const updatedTodos = parsedTodos.filter(item => item.id !== id)
    addUpdatedTodosInStorage('todos', updatedTodos)
}


const findIndexOfCurrentTask = (array, id) => {
    return array.findIndex(item => item.id === id)
}

export const saveCurrentTextInStorage = (text, elementId) => {
    const parsedTodos = parseStorageToArray('todos');
    const updatedTodos = [...parsedTodos];
    const indexOfElement = findIndexOfCurrentTask(parsedTodos, elementId)
    updatedTodos[indexOfElement].text = text
    addUpdatedTodosInStorage('todos', updatedTodos)
}

export const toggleCompleteStatusInStorage = (elementId) => {
    const parsedTodos = parseStorageToArray('todos');
    const updatedTodos = [...parsedTodos];
    const indexOfElement = findIndexOfCurrentTask(parsedTodos, elementId)
    updatedTodos[indexOfElement].completed = !updatedTodos[indexOfElement].completed
    addUpdatedTodosInStorage('todos', updatedTodos)
}