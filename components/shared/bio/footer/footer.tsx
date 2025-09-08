import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BioFooter({ user }: { user: { name: string } }) {
  return (
    <div className="fixed bottom-2 left-0 right-0 flex flex-col gap-2 justify-center items-center">
      <Button asChild>
        <Link href="/">breezi.com/you</Link>
      </Button>
      <span className="text-muted-foreground truncate text-sm leading-tight">
        Join {user.name} on Breezi today
      </span>
    </div>
  );
}
