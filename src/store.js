import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
import { thunk } from 'redux-thunk'

// 中间件middleware和增强器(这个有问题)
// const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(rootReducer, applyMiddleware(thunk))
// console.log(22, store.getState())

// const unsubscribe = store.subscribe(()=> {
//   console.log('State after dispatch: ', store.getState())
// })
// unsubscribe()
export default store