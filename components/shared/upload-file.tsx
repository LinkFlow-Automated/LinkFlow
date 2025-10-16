"use client";

import { updateUserProfile } from "@/lib/actions/user-actions";
import { UploadDropzone } from "@/lib/uploadthing";
import { uploadThemes } from "@/lib/utils/upload-theme";

export default function UploadFile({ userId }: { userId: string }) {
  async function saveUserData(data: {
    name?: string;
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
        onClientUploadComplete={(res) => {
          saveUserData({
            image: res[0].ufsUrl,
          });
        }}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error);
        }}
      />
    </div>
  );
}
