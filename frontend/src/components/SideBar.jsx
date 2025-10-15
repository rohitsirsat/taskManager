import { CheckSquare, FileText, Layers, LogOutIcon } from "lucide-react";
import React, { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { ThemeToggle } from "./themeToggle";
import { Button } from "./ui/button";

function SideBar({ open, setOpen }) {
  return (
    <>
      {/* desktop sidebar */}
      <aside className="hidden md:block w-64 border-r border-border bg-sidebar min-h-[calc(100vh-4rem)] sticky top-16">
        <div className="p-6">
          <nav className="space-y-2">
            <Link
              to={"/tasks"}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <CheckSquare className="h-5 w-5" />
              <span>Tasks</span>
            </Link>
            <Link
              to={"/notes"}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>Notes</span>
            </Link>
            <Link
              to={"/"}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-medium"
            >
              <Layers className="h-5 w-5" />
              <span>Projects</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* mobile sidebar sheet */}
      <Suspense fallback={null}>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="right"
            className="w-[18rem] p-0"
            // aria-describedby="sheet-desc"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>

            <SheetDescription className="sr-only">
              Navigation menu with links to tasks, notes and projects
            </SheetDescription>

            <div className="bg-sidebar h-full min-h-screen">
              <div className="p-4 border-b border-sidebar-border">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <Layers className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-semibold text-sidebar-foreground">
                    ProjectFlow
                  </span>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                <Link
                  to="/tasks"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <CheckSquare className="h-5 w-5" />
                  <span>Tasks</span>
                </Link>

                <Link
                  to="/notes"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <FileText className="h-5 w-5" />
                  <span>Notes</span>
                </Link>

                <Link
                  to="/"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Layers className="h-5 w-5" />
                  <span>Projects</span>
                </Link>
              </nav>

              {/* redesigned footer: theme + logout */}
              <nav
                className="mt-auto p-4 border-t border-sidebar-border"
                aria-label="Sidebar footer"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-sidebar-foreground">
                        Appearance
                      </span>
                      <span className="text-xs text-sidebar-foreground/70">
                        Light / Dark
                      </span>
                    </div>
                  </div>

                  {/* compact theme control for small widths */}
                  <div className="hidden sm:flex items-center">
                    {/* keep as decorative - actual toggle handled by ThemeToggle */}
                    <span className="sr-only">Toggle theme</span>
                  </div>
                </div>

                {/* logout button - full width, clear CTA on mobile */}
                <div className="mt-3">
                  <Button
                    type="button"
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition"
                    onClick={() => {
                      /* TODO: wire logout handler, e.g. call API and redirect */
                    }}
                    aria-label="Log out"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Log out</span>
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </Suspense>
    </>
  );
}

export default SideBar;
