import { Spinner } from "./ui/spinner.jsx";
import { cn } from "@/lib/utils";

export function Loader({ message = "Loading...", className }) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cn(
        // overlay
        "fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <div
        className={cn(
          // loader card
          "flex items-center gap-3 rounded-(--radius) border border-border bg-card px-4 py-3 shadow-md",
        )}
        role="status"
      >
        <Spinner className="h-6 w-6 text-primary motion-reduce:animate-none" />
        <span className="text-sm text-foreground/80">{message}</span>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
