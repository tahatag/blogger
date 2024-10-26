import axios from "axios";
import { TFunction } from "i18next";
import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onUpload = (dictionary: TFunction<any, any>, file: File) => {
  const promise = axios.post("/api/upload", file, {
    headers: {
      "content-type": file?.type || "application/octet-stream",
      "x-vercel-filename": file?.name || "image.png",
    },
  });

  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async (res) => {
        // Successfully uploaded image
        if (res.status === 200) {
          const { url } = (await res.data) as { url: string };
          // preload the image
          const image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
          // No blob store configured
        } else if (res.status === 401) {
          resolve(file);
          throw new Error(
            "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead."
          );
          // Unknown error
        } else {
          throw new Error(dictionary("image.error-general"));
        }
      }),
      {
        loading: dictionary("image.loading"),
        success: dictionary("image.success"),
        error: (e) => {
          reject(e);
          return e.message;
        },
      }
    );
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFn = (dictionary: TFunction<any, any>) =>
  createImageUpload({
    onUpload: (file) => onUpload(dictionary, file),
    validateFn: (file) => {
      if (!file.type.includes("image/")) {
        toast.error(dictionary("image.error-type"));
        return false;
      }
      if (file.size / 1024 / 1024 > 4) {
        toast.error(dictionary("image.error-too-big"));
        return false;
      }
      return true;
    },
  });
