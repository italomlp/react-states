import { TodoRow } from "@/components/todo-row"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FetchTodosFilter } from "@/services/todo"
import { Todo } from "@/types"
import { TodosFilter } from "../todos-filter"

type Props = {
  todos: Todo[]
  isLoading: boolean
  onCreate: (description: string) => void
  onDelete: (id: string) => void
  handleToggle: (id: string) => void
  filter: FetchTodosFilter
  refetchTodos: () => void
  handleFilterChange: (newFilter: FetchTodosFilter) => void
}

export const TodosPage = ({
  todos,
  isLoading,
  onCreate,
  onDelete,
  handleToggle,
  filter,
  refetchTodos,
  handleFilterChange,
}: Props) => {
  return (
    <div className="w-full p-8 flex justify-center items-center">
      <div className="w-1/2">
        <h3 className="font-bold pb-1 border-b mb-4">Todos</h3>
        <TodosFilter
          filter={filter}
          handleFilterChange={handleFilterChange}
          refetchTodos={refetchTodos}
        />
        <div className="flex flex-col gap-4">
          {isLoading && <div>Loading...</div>}
          {todos.map((todo) => (
            <TodoRow
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggleCheck={handleToggle}
            />
          ))}
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              const description = e.currentTarget.description.value
              onCreate(description)
              e.currentTarget.reset()
            }}
          >
            <Input name="description" type="text" />
            <Button type="submit">Add</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
