import getUrl from "@/services/uploadImage";
import { FileTypes } from "./types";

export async function getFile(file: FileList, searchParams: string) {
  const params = new URLSearchParams(searchParams);
  const newFormData = new FormData();
  if (
    (file.length > 0 && file[0]?.type === FileTypes.Jpeg) ||
    file[0]?.type === FileTypes.Png
  ) {
    newFormData.append("image", file[0]);
    const response = await getUrl(newFormData);

    if (response.body.error) return { body: null, error: response.body.error };

    params.set("image", response.body.image_url);
    params.toString();
    return { body: params, error: null };
  }
  return { body: null, error: "File not Supported" };
}

export async function verifyFile(file: FileList | null, searchParams: string) {
  if (!file) {
    return {
      state: {
        type: "SET_IN_DROP_ZONE",
        isDragging: false,
        file: null,
        dropped: false,
      },
      error: "No file selected",
    };
  }

  const response = await getFile(file, searchParams);

  if (response.error) {
    return {
      state: {
        type: "SET_IN_DROP_ZONE",
        isDragging: false,
        file: null,
        dropped: false,
      },
      error: response.error,
    };
  }

  return {
    state: {
      type: "SET_IN_DROP_ZONE",
      isDragging: false,
      file: response,
      dropped: true,
    },
    error: null,
  };
}
