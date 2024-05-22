import { useSelector, useDispatch } from "react-redux"
import { availableColors, capitalize } from "../filters/colors"
import { ReactComponent as TimesSolid } from "./times-solid.svg";
import { todoDeleted, todoColorSelected, todoToggled, selectTodoById } from "./todosSlice2";

const TodoListItem = ({ id }) => {
  // const todoArray = useSelector(state => state.todos)
  // const todo = todoArray.find(item => item.id === id)

  // 优化
  const todo = useSelector(state => selectTodoById(state, id))
  const { text, completed, color } = todo

  // 获取select的下拉选
  const colorOptions = availableColors.map(c=>(
    <option key={c} value={c}>{ capitalize(c)}</option>
  ))
  const dispatch = useDispatch()
  // 删除
  // const onDelete = ()=>{
  //   dispatch({type: 'todos/todoDeleted', payload: todo.id})
  // }
  // 删除优化
  const onDelete = () => {
    dispatch(todoDeleted(todo.id))
  }
  // 选中之后通过color属性改变颜色
  // const handleColorChange = (e) => {
  //   const color = e.target.value
  //   dispatch({
  //     type: 'todos/colorSelected',
  //     payload: {todoId: todo.id, color}
  //   })
  // }
  // 优化
  const handleColorChange = (e) => {
    const color = e.target.value
    dispatch(todoColorSelected(todo.id, color))
  }
  // const handleCompletedChange =()=>{
  //   dispatch({type: 'todos/todoToggled', payload: todo.id})
  // }
  // 优化
  const handleCompletedChange = () => {
    dispatch(todoToggled(todo.id))
  }
  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input className="toggle" type="checkbox" checked={completed} onChange={handleCompletedChange} />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select 
            className='colorPicker'
            onChange={handleColorChange}
            value={color}
            style={{color}}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid/>
          </button>
        </div>
      </div>
    </li>
  )
}
export default TodoListItem