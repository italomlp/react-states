import { renderHook } from "@testing-library/react"

import { testZustand } from "@/tests"

import { INITIAL_STATE, useTodos } from "./state"

const createTodoFn = jest.fn()
const toggleTodoFn = jest.fn()
const deleteTodoFn = jest.fn()
const fetchTodosFn = jest.fn()

const TODO_MOCK = {
  id: "1",
  description: "Test Todo",
  completed: false,
}

jest.mock("@/services/todo", () => {
  return {
    fetchTodos: (...args: unknown[]) => fetchTodosFn(...args),
    createTodo: (...args: unknown[]) => createTodoFn(...args),
    deleteTodo: (...args: unknown[]) => deleteTodoFn(...args),
    toggleTodo: (...args: unknown[]) => toggleTodoFn(...args),
  }
})

describe("Todos Store", () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(async () => {
    useTodos.setState(INITIAL_STATE)
    fetchTodosFn.mockResolvedValue([TODO_MOCK])
  })

  it("creates initial state", () => {
    const store = renderHook(() => useTodos()).result.current

    expect(store.todos).toHaveLength(0)
    expect(store.isLoading).toBeTruthy()
  })

  it("calls fetchTodos", async () => {
    const success = await testZustand({
      storeApi: useTodos,
      action: (store) => {
        store.fetchTodos()
      },
      expectedStates: [
        {
          state: (state) => [state.isLoading, state.todos],
          customEqualityTest: "toStrictEqual",
          expected: [true, [TODO_MOCK]],
        },
        {
          state: (state) => state.isLoading,
          expected: false,
        },
      ],
    })

    expect(success).toBeTruthy()
    expect(fetchTodosFn).toHaveBeenCalledTimes(1)
  })

  it("calls createTodo", async () => {
    createTodoFn.mockResolvedValue({})

    const success = await testZustand({
      storeApi: useTodos,
      action: (store) => {
        store.createTodo(TODO_MOCK.description)
      },
      expectedStates: [
        {
          state: (state) => [state.isLoading, state.todos],
          customEqualityTest: "toStrictEqual",
          expected: [true, [TODO_MOCK]],
        },
        {
          state: (state) => [state.isLoading, state.todos],
          customEqualityTest: "toStrictEqual",
          expected: [false, [TODO_MOCK]],
        },
      ],
    })

    expect(success).toBeTruthy()
    expect(createTodoFn).toHaveBeenCalledTimes(1)
    expect(createTodoFn).toHaveBeenCalledWith(TODO_MOCK.description)
  })

  it("calls toggleTodo", async () => {
    toggleTodoFn.mockResolvedValue({})

    const success = await testZustand({
      storeApi: useTodos,
      action: (store) => {
        store.handleToggle(TODO_MOCK.id)
      },
      expectedStates: [
        {
          state: (state) => [state.isLoading, state.todos],
          customEqualityTest: "toStrictEqual",
          expected: [true, [TODO_MOCK]],
        },
        {
          state: (state) => [state.isLoading, state.todos],
          customEqualityTest: "toStrictEqual",
          expected: [false, [TODO_MOCK]],
        },
      ],
    })

    expect(success).toBeTruthy()
    expect(toggleTodoFn).toHaveBeenCalledTimes(1)
  })

  it("calls deleteTodo", async () => {
    deleteTodoFn.mockResolvedValue({})

    const success = await testZustand({
      storeApi: useTodos,
      action: (store) => {
        store.deleteTodo(TODO_MOCK.id)
      },
      expectedStates: [
        {
          state: (state) => [state.isLoading, state.todos],
          customEqualityTest: "toStrictEqual",
          expected: [true, [TODO_MOCK]],
        },
        {
          state: (state) => [state.isLoading, state.todos],
          customEqualityTest: "toStrictEqual",
          expected: [false, [TODO_MOCK]],
        },
      ],
    })

    expect(success).toBeTruthy()
    expect(deleteTodoFn).toHaveBeenCalledTimes(1)
  })
})
