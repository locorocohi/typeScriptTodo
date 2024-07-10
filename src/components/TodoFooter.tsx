import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { deleteCompleted } from "../store/TodoSlice";
import FilterButton from "./TodoButton";
import { deleteCompletedInStorage } from "../utils/storageTools";
import type { Task } from "./TodoForm.tsx";

type Props = {
  activeKey: string,
  changeFilterType: (type: string) => void,
}

export default function TodoFooter ({activeKey, changeFilterType}: Props) {
  const dispatch = useAppDispatch()
  const todos: Task[] = useAppSelector(store => store.todos.todos)

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