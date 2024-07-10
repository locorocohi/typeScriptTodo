import { useState } from "react"
import { useDispatch } from "react-redux";

import { deleteTask, completeTask, saveNewText } from "../store/TodoSlice";
import { deleteTaskInStorage, toggleCompleteStatusInStorage, saveCurrentTextInStorage } from "../utils/storageTools";

import { ENTER_KEYCODE, ESC_KEYCODE } from "../utils/constants";

export default function TodoItem ({task}) {
  const [isEditing, setEditingStatus] = useState(false)

  const dispatch = useDispatch()

  const saveCurrentText = (event) => {
    const text = event.target.value
    const id = task.id 

    dispatch(saveNewText({text, id}))
    saveCurrentTextInStorage(text, id)
  }

  const saveTextByEnter = (event) => {
    if(event.keyCode === ENTER_KEYCODE) {
      if(!event.target.value.trim()) {
        saveCurrentText(event)
      }
      setEditingStatus(!isEditing)
    }
    if(event.keyCode === ESC_KEYCODE) {
      setEditingStatus(!isEditing)
    }
  }

  const handlerEditing = () => {
    setEditingStatus(!isEditing)
  }

  const onChangeEventInput = (event) => {
    if(event.target.value !== '') {
      saveCurrentText(event)
    }
  }

  const deleteCurrentTask = (id) => {
    dispatch(deleteTask(id))

    deleteTaskInStorage(id)
  }
  
  const toggleTaskStatus = (id) => {
    dispatch(completeTask(id))
    
    toggleCompleteStatusInStorage(id)
  }

  return (
  <li className='todo-item'>
    <input 
      checked={task.completed} 
      type="checkbox" 
      className='checkbox' 
      onChange={() => toggleTaskStatus(task.id)}
    />
    <div style={{width: '100%'}} onDoubleClick={handlerEditing}>
      { !isEditing
          ? <p className={`${task.completed ? 'completed' : 'todo-text'}`}> {task.text} </p>
          : <input type="text" 
              defaultValue={task.text} 
              className='editing todo-input' 
              onBlur={handlerEditing} 
              onKeyDown={saveTextByEnter} 
              onChange={onChangeEventInput}
              placeholder="Let`s edit this task"
            />
      }
    </div>
    <button 
      className="todo-delete-btn" 
      onClick={() => deleteCurrentTask(task.id)}>X</button>
  </li>
  )
}
