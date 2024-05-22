import { combineReducers } from "redux";
import todosReducer from './features/todos/todosSlice2'
import filtersReducer from "./features/filters/filterSlice2";

// 键名时state对象中的键
const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer
})

export default rootReducer