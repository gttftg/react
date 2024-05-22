/**
 * (1)调用action creator: 创建并返回一个action对象的函数
 * 
 * const todoAdd = text => {
 *  return {
 *    type: 'todos/todoAdded',
 *    payload: text
 *  }
 * }
 * store.dispatch(todoAdd('Buy milk'))
 * 
 * (2) 记忆化， selectors有助于提高Redux应用性能
 * reselect有一个createSelector API可以生成记忆化
 * 
 * 
 * 
 */
const initialState = [
  {id: 0, text: 'Learn React', completed: true},
  {id: 1, text: 'Learn Redux',completed: false, color:'purple'},
  {id: 2, text: 'Build something fun!', completed: false, color:'blue'}
]

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function appReducer(state = initialState, action) {
  // reducer通常会查看action type字段来决定发生什么
  switch(action.type){
    // 根据不同type的action在这里做一些事情
    case 'todos/todoAdded': {
      // 返回一个新的state对象
      return [
        // 具有所有现有的state数据
        ...state,
        // 用于todos字段的新数组
       {
        id: nextTodoId(state),
        text: action.payload,
        completed: false
       },
      ]
    }
    case 'todos/todoDeleted': {
      return state.filter(todo => todo.id !== action.payload)
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map(todo => {
        if (todo.id !== todoId) {
          return todo
        }
        return {
          ...todo,
          color
        }
      })
    }
    case 'todos/todoToggled': {
      return state.map(todo=>{
        if(todo.id !== action.payload) {
          return todo
        }
        return {
          ...todo,
          completed: !todo.completed
        }
      })
    }
    case 'todos/completedCleared': {
      return state.filter(todo => !todo.completed)
    }
    case 'todos/allCompleted': {
      return state.map(todo=> {
        return {
          ...todo,
          completed: true
        }
      })
    }
    default:
      return state
  }
}