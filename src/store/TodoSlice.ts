import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../components/TodoForm";

type TodosState = {
    todos: Task [],
}

const initialState: TodosState = { todos: [] }

export const todoSlice = createSlice({
    name: 'todos',

    initialState,

    reducers: {

        addTask: (state, action) => {
            state.todos.push(action.payload);
        },

        deleteTask: (state, action) => {
            state.todos = state.todos.filter((item: Task) => item.id !== action.payload)
        },

        deleteCompleted: (state) => {
            state.todos = state.todos.filter((item: Task) => !item.completed)
        },

        completeTask: (state, action) => {
            const toggledTodo = state.todos.find((item: Task) => item.id === action.payload)
            if (typeof toggledTodo !== 'undefined') {
                toggledTodo.completed = !toggledTodo.completed
            }
        },

        completeAll: (state) => {
            const isSomeTasksCompleted = state.todos.some((item: Task) => !item.completed);
            state.todos = state.todos.map((item: Task) => ({...item, completed: isSomeTasksCompleted }));
        },

        saveNewText: (state, action) => {
            const currentTodoIndex = state.todos.findIndex((item: Task) => item.id === action.payload.id)
            state.todos[currentTodoIndex].text = action.payload.text
        },

        saveAllTodos: (state, action) => {
            state.todos = action.payload
        },

    }
})

export const { addTask, deleteTask, deleteCompleted, completeTask, completeAll, saveNewText, saveAllTodos } = todoSlice.actions;
export default todoSlice.reducer;