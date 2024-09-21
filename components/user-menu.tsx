import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ChevronDown, LayoutDashboard, LogOut, Pen, Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function UserMenu() {
  const { data: session } = useSession();
  return !session ? null : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" asChild>
          <div className="gap-2">
            <Avatar className="w-8 h-8 border-white/50 border-3">
              <AvatarImage src={session?.user?.image as string} />
              <AvatarFallback>{(session?.user?.name || "")[0]}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              {session?.user?.name}
              <ChevronDown size={14} />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-1 cursor-pointer">
          <LayoutDashboard size={18} />
          داشبورد
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-1 cursor-pointer">
          <Plus size={18} />
          پست جدید
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-1 cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut size={18} />
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
