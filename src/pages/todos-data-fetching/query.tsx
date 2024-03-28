import {
  FetchTodosFilter,
  createTodo,
  deleteTodo,
  fetchTodos,
  toggleTodo,
} from "@/services/todo"
import { Todo } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const getTodosQueryKey = (filter: FetchTodosFilter = "all") => {
  return ["todosData", filter]
}

export const useTodos = (filter: FetchTodosFilter = "all") => {
  return useQuery<Todo[]>({
    queryKey: [getTodosQueryKey(filter)],
    queryFn: () => fetchTodos(filter),
  })
}

export const useCreateTodo = (filter: FetchTodosFilter = "all") => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (description: string) => createTodo(description),
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: [getTodosQueryKey(filter)],
      })
    },
  })
}

export const useDeleteTodo = (filter: FetchTodosFilter = "all") => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: [getTodosQueryKey(filter)],
      })
    },
  })
}

export const useToggleTodo = (filter: FetchTodosFilter = "all") => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      toggleTodo(id, completed),
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: [getTodosQueryKey(filter)],
      })
    },
  })
}
