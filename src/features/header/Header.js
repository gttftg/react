import { useState } from "react"
import { useDispatch } from "react-redux"
import { saveNewTodo } from "../todos/todosSlice2"
export default function Header() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch() // 更新state
  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleKeyDown = async (e) => {
    console.error(98, e)
    const trimmedText = text.trim()
    if(e.key === 'Enter' && trimmedText) {
      setStatus('loading')
      await dispatch(saveNewTodo(trimmedText))
     // dispatch({type: 'todos/todoAdded', payload: trimmedText})
      setText('')
      setStatus('idle')
    }
  }
  let isLoading = status === 'loading'
  let loader = isLoading ? <div className="loader"></div>: null
  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  )
}