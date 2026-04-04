import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BioFooter({ user }: { user: { name: string } }) {
  return (
    <div className="w-full pb-4 pt-2 flex flex-col gap-1 justify-center items-center bg-background/80 backdrop-blur-sm border-t border-border/50">
      <Button variant="ghost" size="sm" className="h-auto py-1 px-2" asChild>
        <Link href="/" className="text-[10px] text-muted-foreground hover:text-foreground">
          breezi.com/you
        </Link>
      </Button>
      <span className="text-muted-foreground truncate text-[9px] leading-tight">
        Join {user.name} on Breezi today
      </span>
    </div>
  );
}
