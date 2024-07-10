import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todos',

    initialState: {
        todos: []
    },

    reducers: {

        addTask: (state, action) => {
            state.todos.push(action.payload);
        },

        deleteTask: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },

        deleteCompleted: (state) => {
            state.todos = state.todos.filter(item => !item.completed)
        },

        completeTask: (state, action) => {
            const toggledTodo = state.todos.find(item => item.id === action.payload)
            toggledTodo.completed = !toggledTodo.completed
        },

        completeAll: (state) => {
            const isSomeTasksCompleted = state.todos.some(item => !item.completed);
            state.todos = state.todos.map(item => ({...item, completed: isSomeTasksCompleted }));
        },

        saveNewText: (state, action) => {
            const currentTodoIndex = state.todos.findIndex(item => item.id === action.payload.id)
            state.todos[currentTodoIndex].text = action.payload.text
        },

        saveAllTodos: (state, action) => {
            state.todos = action.payload
        },

    }
})

export const { addTask, deleteTask, deleteCompleted, completeTask, completeAll, saveNewText, saveAllTodos } = todoSlice.actions;
export default todoSlice.reducer;