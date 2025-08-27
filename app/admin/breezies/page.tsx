import { PixelPreview } from "@/components/shared/pixel-preview";

export default function page() {
  return (
    <div className="w-full flex flex-row h-full">
      <div className="w-2/3 h-full"></div>
      <div className="w-1/3 flex items-center justify-center h-full">
        <PixelPreview />
      </div>
    </div>
  );
}
