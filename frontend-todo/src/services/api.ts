import axios from 'axios'

export interface Todo {
  _id: string
  text: string
  completed: 'Yes' | 'No'
}

const API = axios.create({
  baseURL: 'http://localhost:5000'
})

export const getTodos = async () => {
  const res = await API.get<Todo[]>('/todos')
  return res.data
}

export const addTodo = async (text: string) => {
  return API.post('/todos', { text, completed: 'No' })
}

export const toggleTodo = async (todo: Todo) => {
  const newStatus = todo.completed === 'Yes' ? 'No' : 'Yes'
  return API.patch(`/todos/${todo._id}`, { completed: newStatus })
}

export const deleteTodo = async (id: string) => {
  return API.delete(`/todos/${id}`)
}