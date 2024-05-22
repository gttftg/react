import { useSelector } from "react-redux"
import TodoListItem from "./TodoListItem"
import { selectFilteredTodoIds } from "./todosSlice2";

const TodoList = ()=> {
  const todoIds = useSelector(selectFilteredTodoIds)
  const loadingStatus = useSelector((state) => state.todos.status)

  if (loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    )
  }
  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId}></TodoListItem>
  })
  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList

