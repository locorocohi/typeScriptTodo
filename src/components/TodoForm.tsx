import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "../store/TodoSlice"
import { addTaskInDb } from "../api/todo";

export default function ToDoForm () {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(text === '') {
      return;
    }

    console.log(text)
    const todo = await addTaskInDb({
      text,
    });

    dispatch(addTask(todo))
    setText('');
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