import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string({
    required_error : 'Name is required',
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({
    required_error : "Description is required",
    invalid_type_error: "Description must be a string",
  }),
});
