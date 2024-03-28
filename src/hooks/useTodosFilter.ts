import { FetchTodosFilter } from "@/services/todo"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

export const parseTodosFilter = (filter: string): FetchTodosFilter => {
  if (!["all", "completed", "uncompleted"].includes(filter)) {
    return "all"
  }
  return filter as FetchTodosFilter
}

export const useTodosFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filter = parseTodosFilter(searchParams.get("filter") || "all")

  useEffect(() => {
    if (!searchParams.get("filter")) {
      setSearchParams({ filter: "all" })
    }
  }, [searchParams, setSearchParams])

  const handleFilterChange = (newFilter: FetchTodosFilter) => {
    setSearchParams({ filter: newFilter }, { replace: true })
  }

  return { filter, handleFilterChange }
}
