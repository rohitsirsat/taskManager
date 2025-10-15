import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

// export type ProjectRow = {
//   id: string | number
//   name: string
//   description: string
//   membersCount: number
//   created: string
// }

// type Props = {
//   projects: ProjectRow[]
//   onEdit?: (id: ProjectRow["id"]) => void
//   onDelete?: (id: ProjectRow["id"]) => void
//   className?: string
// }

export default function ProjectsPage({
  projects,
  onEdit,
  onDelete,
  className,
}) {
  //   const handleEdit = (id: ProjectRow["id"]) => onEdit?.(id)
  //   const handleDelete = (id: ProjectRow["id"]) => onDelete?.(id)

  return (
    <div
      className={[
        "rounded-2xl border border-border bg-background/60 backdrop-blur-sm",
        "shadow-sm overflow-hidden",
        className || "",
      ].join(" ")}
      aria-label="Projects table"
    >
      <Table className="text-base">
        <TableHeader>
          <TableRow className="bg-background/70">
            <TableHead className="text-lg font-semibold">
              Project Name
            </TableHead>
            <TableHead className="text-lg font-semibold">Description</TableHead>
            <TableHead className="text-lg font-semibold">Members</TableHead>
            <TableHead className="text-lg font-semibold">Created</TableHead>
            <TableHead className="text-lg font-semibold text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.map((p) => (
            <TableRow key={p.id} className="border-t border-border/80">
              <TableCell className="py-5">{p.name}</TableCell>
              <TableCell className="py-5 text-muted-foreground">
                {p.description}
              </TableCell>
              <TableCell className="py-5">{p.membersCount}</TableCell>
              <TableCell className="py-5 text-muted-foreground">
                {p.created}
              </TableCell>
              <TableCell className="py-5">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Edit ${p.name}`}
                    onClick={() => handleEdit(p.id)}
                    className="hover:bg-muted/60"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${p.name}`}
                    onClick={() => handleDelete(p.id)}
                    className="hover:bg-muted/60"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {projects.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-10 text-center text-muted-foreground"
              >
                No projects yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
