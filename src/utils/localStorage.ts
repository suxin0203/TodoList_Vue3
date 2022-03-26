import {User} from '../types/todo'
export function saveTodo(todosData:User[]){
    // watch(()=>state.todosData,(vale)=>{
  localStorage.setItem('todo_key',JSON.stringify(todosData))
// },{deep:true})
}

export function readTodo():User[]{
    return JSON.parse(localStorage.getItem('todo_key') || '[]')
}