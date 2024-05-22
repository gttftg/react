import { client } from '../../api/client'
import { createSelector } from 'reselect'
import { StatusFilters } from '../filters/filterSlice2'
const initialState = {
  status: 'idle',
  entities: {}
}
export default function todosReducer(state = initialState, action) {
  switch(action.type) {
    case 'todos/todoDeleted': {
      const newEntities = { ...state.entities }
      delete newEntities[action.payload]
      return {
        ...state,
        entities: newEntities
      }
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            color
          }
        }
      }
    }
    // 选中框更改完成状态
    case 'todos/todoToggled': {
      const todoId = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            completed: !todo.completed
          }
        }
      }
    }
    case 'todos/todosLoading': {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'todos/todosLoaded': {
      const newEntities = {}
      action.payload.forEach((todo) => {
        newEntities[todo.id] = todo
      })
      return {
        ...state,
        status: 'idle',
        entities: newEntities,
      }
    }
    case 'todos/allCompleted':{
      const newEntities = {...state.entities}
      Object.values(newEntities).forEach(todo=>{
        newEntities[todo.id] ={
          ...todo,
          completed: true
        }
      })
      return {
        ...state,
        entities: newEntities
      }
    }
    case 'todos/completedCleared': {
      const newEntities = {...state.entities}
      Object.values(newEntities).forEach(todo => {
        if(todo.completed) {
          delete newEntities[todo.id]
        }
      })
      return {
        ...state,
        entities: newEntities
      }
    }
    case 'todos/todoAdded': {
      const todo = action.payload
      return {
        ...state,
        entities: {
          ...state.entities,
          [todo.id]: todo
        }
      }
    }
    // switch里面有default
    default:
      return state
  }
  
}

// 使用action creators
export const todoDeleted = (todoId) => ({
  type: 'todos/todoDeleted',
  payload: todoId
})

export const todoColorSelected = (todoId, color) => ({
  type: 'todos/colorSelected',
  payload: { todoId, color }
})

export const todoToggled = (todoId) => ({
  type: 'todos/todoToggled',
  payload: todoId
})

export const allTodosCompleted = () => ({
  type: 'todos/allCompleted'
})

export const completedTodosCleared = () => ({
  type: 'todos/completedCleared'
})
/**获取数据 */
export const todosLoading = () => ({ type: 'todos/todosLoading' })

export const todosLoaded = (todos) => ({
  type: 'todos/todosLoaded',
  payload: todos,
})

export const todoAdded = (todo) => ({
  type: 'todos/todoAdded',
  payload: todo
})
// 从接口中获取数据,在index.js调用外部thunk action creator函数
export const fetchTodos = () => {
  return async function fetchTodosThunk(dispatch) {
    dispatch(todosLoading())
    const response = await client.get('/fakeApi/todos')
    dispatch(todosLoaded(response.todos))
  }
}

// 保存数据
export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch(todoAdded(response.todo))
  }
}
const selectTodoEntities = (state) => state.todos.entities

// 通过id获取todo列表值
export const selectTodoById = (state, todoId) => {
  /* {
    "todos": {
      "status": "idle",
      "entities": {
          "0": {
              "color": "",
              "completed": false,
              "text": "Clean car",
              "id": 0
          },
          "1": {
              "color": "",
              "completed": false,
              "text": "Buy bread",
              "id": 1
          },
          "2": {
              "color": "",
              "completed": false,
              "text": "Clean house",
              "id": 2
          },
          "3": {
              "color": "",
              "completed": false,
              "text": "Clean car",
              "id": 3
          },
          "4": {
              "color": "",
              "completed": false,
              "text": "Buy milk",
              "id": 4
          }
      }
  },
  "filters": {
      "status": "all",
      "colors": []
  }
} */
  return selectTodoEntities(state)[todoId]
}

// 数组，获取对象的值作为数组
export const selectTodos = createSelector(selectTodoEntities, (entities) =>
  Object.values(entities)
)

export const selectFilteredTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    // 没有选项显示所有数据
    if (showAllCompletions && colors.length === 0) {
      return todos
    }
    // 是否完成
    const completedStatus = status === StatusFilters.Completed
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

// 使用createSelector，它将生成selector函数
export const selectFilteredTodoIds = createSelector(
  // 首先传入一个或更多的input selector函数
  selectFilteredTodos,
  // output selector接收所有输入结果作为参数
  (filteredTodos) => {
    return filteredTodos.map((todo) => todo.id)
  }
)

/**
 * Reslect提供一个函数createSelector来创建一个记忆selectors.createSelector接受一个input-selectors和一个变换函数作为参数.
 * 如果Redux的state发生改变造成input-selector的值发生改变,selector会调用变换函数,依据input-selector做参数,返回一个结果.
 * 如果input-selector返回的结果和前面的一样,那么就会直接返回有关state,会省略变换函数的调用
 * 
 */