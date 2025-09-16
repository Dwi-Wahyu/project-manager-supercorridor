import { z } from "zod";

export const InputMaterialSchema = z.object({
  name: z.string().min(1, {
    message: "Tolong isi nama material.",
  }),
  quantity: z.string().min(1, {
    message: "Tolong isi kuantitas material.",
  }),
});

export type InputMaterialSchemaType = z.infer<typeof InputMaterialSchema>;

export const UpdateMaterialSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1, {
    message: "Tolong isi nama material.",
  }),
  quantity: z.string().min(1, {
    message: "Tolong isi kuantitas material.",
  }),
});

export type UpdateMaterialSchemaType = z.infer<typeof UpdateMaterialSchema>;
