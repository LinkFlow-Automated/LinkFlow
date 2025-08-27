import { PixelPreview } from "@/components/shared/pixel-preview";
import { ReactNode } from "react";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-row h-full">
      <div className="w-2/3 h-full">{children}</div>
      <div className="w-1/3 flex items-center justify-center h-full border-l px-18">
        <PixelPreview />
      </div>
    </div>
  );
}
