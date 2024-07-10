import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './TodoSlice.js'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
})
