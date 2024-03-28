import {
  FetchTodosFilter,
  createTodo,
  deleteTodo,
  fetchTodos,
  toggleTodo,
} from "@/services/todo"
import { Todo } from "@/types"
import { create } from "zustand"

type State = {
  todos: Todo[]
  isLoading: boolean
}

type Actions = {
  fetchTodos: (filter?: FetchTodosFilter) => Promise<void>
  createTodo: (description: string) => Promise<void>
  handleToggle: (id: string) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
}

type Store = State & Actions

export const INITIAL_STATE: State = {
  todos: [],
  isLoading: true,
}

export const useTodos = create<Store>((set, get) => ({
  ...INITIAL_STATE,
  fetchTodos: async (filter: FetchTodosFilter = "all") => {
    fetchTodos(filter)
      .then((data) => set({ todos: data }))
      .finally(() => set({ isLoading: false }))
  },
  createTodo: async (description: string) => {
    await createTodo(description)
    await get().fetchTodos()
  },
  handleToggle: async (id: string) => {
    await toggleTodo(id, !get().todos.find((todo) => todo.id === id)?.completed)
    await get().fetchTodos()
  },
  deleteTodo: async (id: string) => {
    await deleteTodo(id)
    await get().fetchTodos()
  },
}))
