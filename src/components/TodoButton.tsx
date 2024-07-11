type Props = {
  title: string,
  changeFilterType: () => void,
  isActive: boolean,
}

export default function FilterButton ({title, changeFilterType, isActive}: Props) {
  return (
    <button 
      className={isActive ? "active todo-btn" : 'todo-btn'} 
      onClick={changeFilterType}>
        {title}
    </button>
  )
}
