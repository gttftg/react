// 展示counter特性的React组件
// import { decrement,increment } from "./counterSlice"
// import { useDispatch, useSelector } from "react-redux"

// /**
//  * 
//  * 1.使用useSelector钩子从store中读取数据
//  * 2.使用useDispatch钩子获取dispatch函数，并根据需要dispatch actions
//  */
// export function counter() {
//   const count = useSelector(state => state.counter.value)
//   // dispatch: 修改对应的action到store
//   const dispatch = useDispatch()
//   return (
//     <div>
//       <button onClick={()=>dispatch(increment())}>Increment</button>
//       <span>{count}</span>
//       <button onClick={()=>dispatch(decrement())}>decrement</button>
//     </div>
//   )
// }