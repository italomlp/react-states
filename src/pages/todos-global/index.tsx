import { TodosPage } from "@/components/todos-page"
import { useTodosFilter } from "@/hooks/useTodosFilter"
import { useEffect } from "react"
import { useTodos } from "./state"

export const TodosGlobal = () => {
  const { createTodo, handleToggle, fetchTodos, isLoading, todos, deleteTodo } =
    useTodos()
  const { filter, handleFilterChange } = useTodosFilter()

  useEffect(() => {
    fetchTodos(filter)
  }, [filter])

  return (
    <TodosPage
      filter={filter}
      handleFilterChange={handleFilterChange}
      handleToggle={handleToggle}
      isLoading={isLoading}
      onCreate={createTodo}
      onDelete={deleteTodo}
      refetchTodos={fetchTodos}
      todos={todos}
    />
  )
}
