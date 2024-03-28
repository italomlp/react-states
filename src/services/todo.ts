export type FetchTodosFilter = "all" | "completed" | "uncompleted"

export const fetchTodos = (
  filter: "all" | "completed" | "uncompleted" = "all"
) =>
  fetch(
    filter !== "all"
      ? `http://localhost:3000/todos?completed=${
          filter === "completed" ? 1 : 0
        }`
      : "http://localhost:3000/todos"
  ).then((res) => res.json())

export const createTodo = (description: string) =>
  fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      completed: false,
    }),
  })

export const deleteTodo = (id: string) =>
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  })

export const toggleTodo = (id: string, completed: boolean) =>
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed,
    }),
  })
