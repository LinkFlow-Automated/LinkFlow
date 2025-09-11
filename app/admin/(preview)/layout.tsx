import { PixelPreview } from "@/components/shared/pixel-preview";
import { ReactNode } from "react";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-row h-screen max-h-screen min-h-screen">
      <div className="w-full md:w-2/3 h-fit">{children}</div>
      <div className="hidden md:w-1/3 md:flex items-center justify-center h-full border-l">
        <PixelPreview />
      </div>
    </div>
  );
}
