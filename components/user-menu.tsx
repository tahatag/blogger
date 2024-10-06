import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ChevronDown, LayoutDashboard, LogOut, Pen, Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function UserMenu() {
  const { t } = useTranslation("common");
  const { data: session } = useSession();
  return !session ? null : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" asChild>
          <div className="gap-2">
            <Avatar className="w-6 h-6 border-white/50 border-3">
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
        <Link href="/dashboard">
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <LayoutDashboard size={18} />
            {t("user.dashboard")}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <Plus size={18} />
          <p>{t("new-post")}</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut size={18} />
          {t("user.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
