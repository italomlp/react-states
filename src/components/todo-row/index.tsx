import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Todo } from "@/types"
import { TrashIcon } from "lucide-react"

type Props = {
  todo: Todo
  onToggleCheck: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoRow = ({ onDelete, onToggleCheck, todo }: Props) => {
  return (
    <div className="flex items-center gap-2" key={todo.id}>
      <Checkbox
        id={todo.id}
        checked={todo.completed}
        onCheckedChange={() => onToggleCheck(todo.id)}
      />
      <label
        htmlFor={todo.id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {todo.description}
      </label>
      <Button
        className="ml-auto"
        variant="outline"
        onClick={() => onDelete(todo.id)}
      >
        <TrashIcon size={10} />
      </Button>
    </div>
  )
}
