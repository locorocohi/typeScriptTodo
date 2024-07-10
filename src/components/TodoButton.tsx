export default function FilterButton ({activeKey, title, changeFilterType, isActive}) {
  return (
    <button 
      className={isActive ? "active todo-btn" : 'todo-btn'} 
      onClick={() => changeFilterType(activeKey)}>
        {title}
    </button>
  )
}
