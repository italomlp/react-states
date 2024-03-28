import { TodosPage } from "@/components/todos-page"
import { useTodosFilter } from "@/hooks/useTodosFilter"
import { useCreateTodo, useDeleteTodo, useTodos, useToggleTodo } from "./query"

export const TodosDataFetching = () => {
  const { filter, handleFilterChange } = useTodosFilter()
  const { isPending, data: todos, refetch: fetchTodos } = useTodos(filter)

  const createTodoMutation = useCreateTodo(filter)

  const deleteTodoMutation = useDeleteTodo(filter)

  const handleToggleMutation = useToggleTodo(filter)

  return (
    <TodosPage
      filter={filter}
      handleFilterChange={handleFilterChange}
      handleToggle={(id) =>
        handleToggleMutation.mutate({
          id,
          completed: !todos?.find((todo) => todo.id === id)?.completed,
        })
      }
      isLoading={isPending}
      onCreate={createTodoMutation.mutate}
      onDelete={deleteTodoMutation.mutate}
      refetchTodos={fetchTodos}
      todos={todos ?? []}
    />
  )
}
