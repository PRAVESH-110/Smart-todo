import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, addTodo, toggleTodo, deleteTodo, type Todo } from './services/api'
import './App.css'

function App() {
  const [newTodo, setNewTodo] = useState('')

  // queryClient lets us interact with the cache (e.g. invalidate data)
  const queryClient = useQueryClient()

  // 1. Fetch Todos (useQuery)
  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todos'], // This is the unique key for this piece of data
    queryFn: getTodos
  })

  // 2. Add Todo (useMutation)
  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    // When mutation succeeds, invalidate 'todos' so it automatically refetches
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setNewTodo('') // Clear the input
    }
  })

  // 3. Toggle Todo Status
  const toggleTodoMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  })

  // 4. Delete Todo
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  })

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    addTodoMutation.mutate(newTodo)
  }

  if (isLoading) return <div>Loading your todos...</div>
  if (isError) return <div>Error loading todos. Is your backend running?</div>

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h1>My Smart Todos</h1>

      <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" disabled={addTodoMutation.isPending}>
          {addTodoMutation.isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos?.map(todo => (
          <li key={todo._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #ccc' }}>
            <span
              onClick={() => toggleTodoMutation.mutate(todo)}
              style={{
                textDecoration: todo.completed === 'Yes' ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodoMutation.mutate(todo._id)}
              disabled={deleteTodoMutation.isPending}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos?.length === 0 && <p>No todos yet!</p>}
    </div>
  )
}

export default App
