import { TodosPage } from "@/components/todos-page"
import { useTodosFilter } from "@/hooks/useTodosFilter"
import {
  createTodo,
  deleteTodo,
  fetchTodos as loadTodos,
  toggleTodo,
} from "@/services/todo"
import { Todo } from "@/types"
import { useEffect, useState } from "react"

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { filter, handleFilterChange } = useTodosFilter()

  const fetchTodos = async () => {
    loadTodos(filter)
      .then((data) => setTodos(data))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleToggle = async (id: string) => {
    await toggleTodo(id, !todos.find((todo) => todo.id === id)?.completed)

    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    )
  }

  const onCreate = async (description: string) => {
    await createTodo(description)
    fetchTodos()
  }

  const onDelete = async (id: string) => {
    await deleteTodo(id)
    fetchTodos()
  }

  return (
    <TodosPage
      filter={filter}
      handleFilterChange={handleFilterChange}
      handleToggle={handleToggle}
      isLoading={isLoading}
      onCreate={onCreate}
      onDelete={onDelete}
      refetchTodos={fetchTodos}
      todos={todos}
    />
  )
}
