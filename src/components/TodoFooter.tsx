import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { deleteCompleted } from "../store/TodoSlice";
import FilterButton from "./TodoButton";
import type { Task } from "./TodoForm.tsx";
import { AVAILABLE_KEYS } from "../utils/constants.ts";
import { removeCompletedTasks } from "../api/todo.ts";

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

    removeCompletedTasks()
  }

  return (
    <footer className="todo-footer">
      <div className="todo-filters">
        <FilterButton 
          changeFilterType={() => changeFilterType(AVAILABLE_KEYS.ALL)}
          title={`All (${todosCount.all})`}
          isActive={activeKey === AVAILABLE_KEYS.ALL && todos.length > 0}
        />
        <FilterButton
          changeFilterType={() => changeFilterType(AVAILABLE_KEYS.ACTIVE)}
          title={`Active (${todosCount.active})`}
          isActive={activeKey === AVAILABLE_KEYS.ACTIVE}
        />
        <FilterButton 
          changeFilterType={() => changeFilterType(AVAILABLE_KEYS.COMPLETED)}
          title={`Completed (${todosCount.all-todosCount.active})`}
          isActive={activeKey === AVAILABLE_KEYS.COMPLETED}
        />
      </div>
      <button className="todo-btn delete-all-btn" onClick={deleteCompletedAndChangeFilter}>Clear Completed</button>
    </footer>
  )
}