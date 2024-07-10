import { useDispatch, useSelector } from "react-redux";
import { deleteCompleted } from "../store/TodoSlice";
import FilterButton from "./TodoButton";
import { deleteCompletedInStorage } from "../utils/storageTools";


export default function TodoFooter ({changeFilterType, activeKey}) {
  const dispatch = useDispatch()
  const todos = useSelector(store => store.todos.todos)

  const todosCount = {
    all: todos.length,
    active: todos.filter(item => !item.completed).length,
  }
  
  const deleteCompletedAndChangeFilter = () => {
    dispatch(deleteCompleted())
    changeFilterType('all')

    deleteCompletedInStorage()
  }

  return (
    <footer className="todo-footer">
      <div className="todo-filters">
        <FilterButton 
          activeKey={'all'}
          changeFilterType={changeFilterType}
          title={`All (${todosCount.all})`}
          isActive={activeKey === 'all' && todos.length > 0}
        />
        <FilterButton
          activeKey={'active'}
          changeFilterType={changeFilterType}
          title={`Active (${todosCount.active})`}
          isActive={activeKey === 'active'}
        />
        <FilterButton 
          activeKey={'completed'}
          changeFilterType={changeFilterType}
          title={`Completed (${todosCount.all-todosCount.active})`}
          isActive={activeKey === 'completed'}
        />
      </div>
      <button className="todo-btn delete-all-btn" onClick={deleteCompletedAndChangeFilter}>Clear Completed</button>
    </footer>
  )
}