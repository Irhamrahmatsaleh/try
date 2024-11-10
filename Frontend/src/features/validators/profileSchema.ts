import { z } from "zod";

const MAX_FILE_SIZE = 500000; // 5mb

export const profileSchema = z.object({
full_name: z.string({message: "Nama harus berupa string!"}),
username: z.string({message: "Username harus berupa string!"}),
bio: z.string({message: "Bio harus berupa string!"}),
photo_profile: z.any().nullable().refine(
    (files) => {
      if(!files[0]) return true;
        return files[0].size <= MAX_FILE_SIZE},
    `Max file size is 5MB.`
  )

// .nullable().refine(
//   (files) => !files || (files && files[0]?.size <= MAX_FILE_SIZE),
//     `Max file size is 5MB.`
//   )
});