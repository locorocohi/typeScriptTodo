import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "../store/TodoSlice"
import { addCurrentTaskInStorage } from "../utils/storageTools";

export default function ToDoForm () {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if(text === '') {
      return;
    }
    const task = {
      id: Date.now(), 
      text: text,
      completed: false,
    }
    dispatch(addTask(task))
    setText('');
    addCurrentTaskInStorage(task)
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input type="text"
      className="todo-input"
      placeholder="Write something" 
      onChange={(event) => setText(event.target.value)}
      value={text}
      />
      <button type='submit' className="todo-btn">Add Task</button>
    </form>
  )
}