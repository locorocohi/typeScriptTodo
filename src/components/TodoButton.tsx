type Props = {
  activeKey: string,
  title: string,
  changeFilterType: (type: string) => void,
  isActive: boolean,
}

export default function FilterButton ({activeKey, title, changeFilterType, isActive}: Props) {
  return (
    <button 
      className={isActive ? "active todo-btn" : 'todo-btn'} 
      onClick={() => changeFilterType(activeKey)}>
        {title}
    </button>
  )
}
