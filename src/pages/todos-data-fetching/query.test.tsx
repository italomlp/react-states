import { renderHook } from "@/tests"
import { waitFor } from "@testing-library/react"
import { useCreateTodo, useDeleteTodo, useTodos, useToggleTodo } from "./query"

const TODO_MOCK = {
  id: "1",
  description: "Test Todo",
  completed: false,
}

const createTodoFn = jest.fn()
const toggleTodoFn = jest.fn()
const deleteTodoFn = jest.fn()
const fetchTodosFn = jest.fn()

jest.mock("@/services/todo", () => {
  return {
    fetchTodos: (...args: unknown[]) => fetchTodosFn(...args),
    createTodo: (...args: unknown[]) => createTodoFn(...args),
    deleteTodo: (...args: unknown[]) => deleteTodoFn(...args),
    toggleTodo: (...args: unknown[]) => toggleTodoFn(...args),
  }
})

describe("Todos Query", () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  it("calls fetchTodos", async () => {
    fetchTodosFn.mockResolvedValue([TODO_MOCK])
    const { result } = renderHook(() => useTodos())

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toStrictEqual([TODO_MOCK])
    expect(fetchTodosFn).toHaveBeenCalledTimes(1)
  })

  it("calls createTodo", async () => {
    createTodoFn.mockResolvedValue({})
    renderHook(() => useTodos())
    const { result } = renderHook(() => useCreateTodo())
    result.current.mutate(TODO_MOCK.description)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(createTodoFn).toHaveBeenCalledTimes(1)
    expect(createTodoFn).toHaveBeenCalledWith(TODO_MOCK.description)
  })

  it("calls deleteTodo", async () => {
    deleteTodoFn.mockResolvedValue({})
    renderHook(() => useTodos())
    const { result } = renderHook(() => useDeleteTodo())
    result.current.mutate(TODO_MOCK.id)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(deleteTodoFn).toHaveBeenCalledTimes(1)
    expect(deleteTodoFn).toHaveBeenCalledWith(TODO_MOCK.id)
  })

  it("calls toggleTodo", async () => {
    toggleTodoFn.mockResolvedValue({})
    renderHook(() => useTodos())
    const { result } = renderHook(() => useToggleTodo())
    result.current.mutate({ id: TODO_MOCK.id, completed: !TODO_MOCK.completed })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(toggleTodoFn).toHaveBeenCalledTimes(1)
    expect(toggleTodoFn).toHaveBeenCalledWith(
      TODO_MOCK.id,
      !TODO_MOCK.completed
    )
  })
})
