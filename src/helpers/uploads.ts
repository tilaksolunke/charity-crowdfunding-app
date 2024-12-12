import { firebaseApp } from "@/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImagesToFirebaseAndReturnUrls = async (files: any[]) => {
  try {
    const storage = getStorage(firebaseApp);

    const uploadedImagesResponses = await Promise.all(
      files.map((file) => {
        return uploadBytes(ref(storage, `images/${file.name}`), file);
      })
    );
    const uploadedImagesURLs = await Promise.all(
      uploadedImagesResponses.map((response) => {
        return getDownloadURL(response.ref);
      })
    );

    return uploadedImagesURLs;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
