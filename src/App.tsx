import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAllTodos, completeAll } from './store/TodoSlice';
import { completeAllInStorage, parseStorageToArray } from './utils/storageTools';

import './App.css';

import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem';
import TodoFooter from './components/TodoFooter';

import { AVAILABLE_KEYS } from './utils/constants';

function App () {
  const dispatch = useDispatch()
  const [key, setKey] = useState(AVAILABLE_KEYS.ALL);
  const todos = useSelector(store => store.todos.todos)

  useEffect(() => {
    const parsedTodos = parseStorageToArray('todos');
    if(!parsedTodos?.length) {
      return
    }
    dispatch(saveAllTodos(parsedTodos))
  }, [])

  const checkedAllStatus = todos.length ? todos.every(item => item.completed) : false

  const filteredTasks = useMemo(() => {
    if (key === AVAILABLE_KEYS.ALL) {
      return todos;
    }
    return todos.filter(item => {
      if (key === AVAILABLE_KEYS.ACTIVE) {
        return !item.completed;
      }
      return item.completed;
    })
  }, [key, todos]);

  const changeFilterType = (type) => {
    setKey(type);
  }

  const completeAllTasks = () => {
    dispatch(completeAll())
    completeAllInStorage()
  }

  return (
    <div className='todo-board'>
      <div className='todo-input-row'>
        <label className='todo-checked'>
          <p>Check All</p>
          <input checked={checkedAllStatus} type='checkbox' className="todo-check-all" onChange={completeAllTasks}/></label>
        <TodoForm />
      </div>
      {filteredTasks.length > 0 && <ul className='todo-list'>
        {filteredTasks.map((item) => (
          <TodoItem 
          task={item} 
          key={item.id}
          />
        ))}
      </ul>}
      <TodoFooter changeFilterType={changeFilterType} activeKey={key}/>
    </div>
  )
}

export default App
