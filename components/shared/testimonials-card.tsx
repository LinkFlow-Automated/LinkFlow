import { Card, CardDescription, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TestimonialsCard({
  name,
  img,
  description,
  className,
}: {
  name: string;
  img: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-4", className)}>
      <Card className="m-0 p-0 flex-1 h-full flex flex-col justify-center items-center rounded-4xl bg-card">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </Card>
      <div className="m-0 p-0 relative flex-1 h-full rounded-4xl">
        <div className="w-full h-full m-0 p-0">
          <Image
            src={img}
            alt={name}
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-4xl p-0 m-0"
          />
        </div>
        {/* dot with absolute position in top left */}
        <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-primary" />
      </div>
    </div>
  );
}
