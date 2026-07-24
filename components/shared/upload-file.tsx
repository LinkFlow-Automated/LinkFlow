"use client";

import { updateUserProfile } from "@/lib/actions/user-actions";
import { UploadDropzone } from "@/lib/uploadthing";
import { uploadThemes } from "@/lib/utils/upload-theme";
import { usePreviewStore } from "@/stores/preview-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UploadFile({ userId }: { userId: string }) {
  const router = useRouter();

  async function saveUserData(data: {
    displayName?: string;
    image?: string;
    username?: string;
    bio?: string;
  }) {
    await updateUserProfile(userId, data);
  }
  return (
    <div>
      <UploadDropzone
        appearance={uploadThemes.default.uploadDropzone}
        endpoint={"imageUploader"}
        onClientUploadComplete={async (res) => {
          const image = res[0].ufsUrl;
          await saveUserData({ image });
          // Reflect the new avatar in the live preview immediately.
          usePreviewStore.getState().setProfile({ image });
          toast.success("Image updated");
          router.refresh();
        }}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error);
          toast.error("Upload failed");
        }}
      />
    </div>
  );
}
