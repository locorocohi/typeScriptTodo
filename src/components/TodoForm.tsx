import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "../store/TodoSlice"
import { addTaskInDb } from "../api/todo";

export type Task = {
  id: number, 
  text: string,
  completed: boolean,
};

export default function ToDoForm () {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(text === '') {
      return;
    }
    const task: Task = {
      id: Date.now(), 
      text: text,
      completed: false,
    }
    dispatch(addTask(task))
    setText('');
    addTaskInDb(task)
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input type="text"
      className="todo-input"
      placeholder="Write something" 
      onChange={(event) => setText(event.currentTarget.value)}
      value={text}
      />
      <button type='submit' className="todo-btn">Add Task</button>
    </form>
  )
}