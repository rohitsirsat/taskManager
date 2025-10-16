import {
  Layers,
  Search,
  Menu,
  User as UserIcon,
  LogOut as LogOutIcon,
} from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ThemeToggle } from "./themeToggle";
import { LocalStorage } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContex.jsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

function Header({ setSidebarOpen }) {
  const StoredUser = LocalStorage.get("user") || {};
  const StoredColor = LocalStorage.get("gbColor") || "#6b7280";
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      /* ignore */
    } finally {
      navigate("/login");
    }
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="relative flex items-center h-16 px-4 md:px-6">
        {/* Brand (left) */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Layers className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-foreground leading-none">
              ProjectFlow
            </span>
          </div>
        </div>

        {/* Search centered on larger screens */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden sm:block w-full max-w-lg px-4">
          <div className="relative">
            <Search className="hidden sm:block absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10 w-full bg-muted/50"
              aria-label="Search projects"
            />
          </div>
        </div>

        {/* Controls (right): theme, avatar dropdown, mobile menu */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:flex items-center">
            <ThemeToggle />
          </div>

          {/* avatar with shadcn DropdownMenu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                aria-label="Open profile menu"
                className="flex items-center rounded-full p-0.5 cursor-pointer"
                title={StoredUser?.username || "Profile"}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback style={{ backgroundColor: StoredColor }}>
                    {(StoredUser?.username?.[0] || "U").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel className="truncate">
                {StoredUser?.username || "User"}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  navigate("/profile");
                }}
                className="flex items-center gap-2"
              >
                <UserIcon className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOutIcon className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* mobile menu button - last element */}
          <button
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md bg-muted hover:bg-muted/80 transition ml-1 cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
