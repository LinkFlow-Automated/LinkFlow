import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonContent() {
  return (
    <div>
      <Skeleton className="w-full h-24 animate-pulse " />
    </div>
  );
}
