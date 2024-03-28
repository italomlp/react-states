import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { parseTodosFilter } from "@/hooks/useTodosFilter"
import { FetchTodosFilter } from "@/services/todo"
import { useEffect } from "react"

type Props = {
  refetchTodos: () => void
  filter: FetchTodosFilter
  handleFilterChange: (newFilter: FetchTodosFilter) => void
}

export const TodosFilter = ({
  refetchTodos: fetchTodos,
  filter,
  handleFilterChange,
}: Props) => {
  useEffect(() => {
    fetchTodos()
  }, [filter, fetchTodos])

  return (
    <ToggleGroup
      type="single"
      value={filter}
      onValueChange={(newFilter) => {
        handleFilterChange(parseTodosFilter(newFilter))
      }}
    >
      <ToggleGroupItem value="all">All</ToggleGroupItem>
      <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
      <ToggleGroupItem value="uncompleted">Uncompleted</ToggleGroupItem>
    </ToggleGroup>
  )
}
