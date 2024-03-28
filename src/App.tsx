import "./index.css"

import { QueryClientProvider } from "@tanstack/react-query"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Todos } from "./pages/todos"
import { TodosDataFetching } from "./pages/todos-data-fetching"
import { TodosGlobal } from "./pages/todos-global"
import { queryClient } from "./query"

const router = createBrowserRouter([
  {
    path: "/todos",
    element: <Todos />,
  },
  {
    path: "/todos-global",
    element: <TodosGlobal />,
  },

  {
    path: "/todos-data-fetching",
    element: <TodosDataFetching />,
  },
  {
    path: "*",
    element: <Navigate to="/todos" replace={true} />,
  },
])

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)

export default App
