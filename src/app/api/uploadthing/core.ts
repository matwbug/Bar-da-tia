import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { nextAuthOptions } from "../auth/[...nextauth]/route";
 
const f = createUploadthing();
 
export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
        const session = await getServerSession(nextAuthOptions)
        if (!session) throw new UploadThingError("Unauthorized");

        return { userId: session.user?.name };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;