import { z } from "zod";

const MAX_FILE_SIZE = 500000; // 5mb

export const createThreadSchema = z.object({
  content: z.string().min(1).max(280),
  image: z
    .any().nullable().refine(
      (files) => {
        if(!files[0]) return true;
          return files[0].size <= MAX_FILE_SIZE},
      `Max file size is 5MB.`
    )
    // .refine((files) => files?.length == 1, "Image is required.")
    
    // .refine(
    //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //   ".jpg, .jpeg, .png and .webp files are accepted."
    // )
    ,
});