import { useSelector, useDispatch } from 'react-redux'
import { availableColors, capitalize } from '../filters/colors'
import { StatusFilters, colorFilterChanged, statusFilterChanged } from '../filters/filterSlice2'
import { completedTodosCleared, allTodosCompleted, selectTodos} from '../todos/todosSlice2'
const RemainingTodos = ({count})=> {
  const suffix = count === 1 ? '' : 's'
  return (
    <div className='todo-count'>
      <h5>Remaining Todos</h5>
      <strong>{count}</strong>item{suffix} left
    </div>
  )
}
// 子组件接收数据
const ColorFilters = ({value: colors, onChange}) => {
  const renderColors = availableColors.map((color) => {
    const checked = colors.includes(color)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }
    return (
      <label key={color}>
        <input type="checkbox" name={color} checked={checked} onChange={handleChange}></input>
        <span className='color-block' style={{backgroundColor: color}}></span>
        {capitalize(color)}
      </label>
    )
  })
  return (
    <div className="filters colorFilters">
      <h5>Filter By Color</h5>
      <form className="colorSelection">{ renderColors }</form>
    </div>
  )
}
const StatusFilter = ({ value: status, onChange })=> {
  const renderedFilters = Object.keys(StatusFilters).map(key => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''
    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>{key}</button>
      </li>
    )
  })
  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}
const Footer = () => {
  // 未完成的数
  const todosRemaining = useSelector(state=> {
    // const uncompletedTodos = state.todos.filter(todo => !todo.completed)
    // return uncompletedTodos.length
    const uncompletedTodos = selectTodos(state).filter(todo => !todo.completed)
    return uncompletedTodos.length
  })
  const dispatch = useDispatch()
  // const onClearCompletedClicked = () => {
  //   dispatch({type: 'todos/completedCleared'})
  // }
  // const onMarkCompletedClicked = () => {
  //   dispatch({type: 'todos/allCompleted'})
  // }
  // const onColorChange = (color, changeType) => {
  //   dispatch({
  //     type: 'filters/colorFilterChanged',
  //     payload: { color, changeType}
  //   })
  // }
  // const onStatusChange = (status) => {
  //   dispatch({
  //     type: "filters/statusFilterChanged",
  //     payload: status
  //   })
  // }
  // 优化
  const onClearCompletedClicked = () => {
    dispatch(completedTodosCleared())
  }
  const onMarkCompletedClicked = () => {
    dispatch(allTodosCompleted())
  }
  const onColorChange = (color, changeType) => {
    dispatch(colorFilterChanged(color, changeType))
  }
  const onStatusChange = (status) => {
    dispatch(statusFilterChanged(status))
  }
  const { status, colors } = useSelector(state => state.filters)
  console.error(2, status, colors)
  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={onMarkCompletedClicked}> Mark All Completed</button>
        <button className="button" onClick={onClearCompletedClicked}> Clear Completed</button>
      </div>
      <RemainingTodos count={todosRemaining}></RemainingTodos>
      <StatusFilter value={status} onChange={onStatusChange}></StatusFilter>
      <ColorFilters value={colors} onChange={onColorChange}></ColorFilters>
    </footer>
  )
}
export default Footer
