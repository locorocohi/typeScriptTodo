import type { Task } from "../components/TodoForm"

export const addUpdatedTodosInStorage = (key: string, arrayToAdd: Task []) => {
    window.localStorage.setItem(key, JSON.stringify(arrayToAdd))
}

export const parseStorageToArray = (key: string): Task [] | void => {
    const itemFromStorage: string | null = window.localStorage.getItem(key)
    if (typeof itemFromStorage === 'string') {
        return JSON.parse(itemFromStorage)
    }
}

export const completeAllInStorage = () => {
    const parsedTodos = parseStorageToArray('todos')
    if (parsedTodos) {
        const isSomeTasksCompleted = parsedTodos.some((item: Task) => !item.completed);
        const updatedTodos: Task [] = parsedTodos.map((item: Task) => ({...item, completed: isSomeTasksCompleted }));
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

export const addCurrentTaskInStorage = (task: Task) => {
    const parsedTodos = parseStorageToArray('todos')
    const todosWithNewItem = parsedTodos ? [...parsedTodos, task] : [task]
    addUpdatedTodosInStorage('todos', todosWithNewItem)
}

export const deleteTaskInStorage = (id: number) => {
    const parsedTodos: Task [] | void = parseStorageToArray('todos')
    if(typeof parsedTodos !== 'undefined') {
        const updatedTodos = parsedTodos.filter((item: Task) => item.id !== id)
        addUpdatedTodosInStorage('todos', updatedTodos)
    }
}


const findIndexOfCurrentTask = (array: Task [], id: number) => {
    return array.findIndex(item => item.id === id)
}

export const saveCurrentTextInStorage = (text: string, elementId: number) => {
    const parsedTodos = parseStorageToArray('todos');
    if(typeof parsedTodos !== 'undefined') {
        const updatedTodos = [...parsedTodos];
        const indexOfElement = findIndexOfCurrentTask(parsedTodos, elementId)
        updatedTodos[indexOfElement].text = text
        addUpdatedTodosInStorage('todos', updatedTodos)
    }
}

export const toggleCompleteStatusInStorage = (elementId: number) => {
    const parsedTodos = parseStorageToArray('todos');
    if(typeof parsedTodos !== 'undefined') {
        const updatedTodos = [...parsedTodos];
        const indexOfElement = findIndexOfCurrentTask(parsedTodos, elementId)
        updatedTodos[indexOfElement].completed = !updatedTodos[indexOfElement].completed
        addUpdatedTodosInStorage('todos', updatedTodos)
    }
}