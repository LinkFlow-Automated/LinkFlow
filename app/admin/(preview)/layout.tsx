import { PixelPreview } from "@/components/shared/pixel-preview";
import { ReactNode } from "react";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-row h-screen max-h-screen min-h-screen">
      <div className="w-2/3 h-fit overflow-y-auto">{children}</div>
      <div className="w-1/3 flex items-center justify-center h-full border-l px-18 fixed top-0 right-0">
        <PixelPreview />
      </div>
    </div>
  );
}
