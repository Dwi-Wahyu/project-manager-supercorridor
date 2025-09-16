import { z } from "zod";

export const InputClientSchema = z.object({
  name: z.string().min(1, {
    message: "Tolong isi nama client.",
  }),
});

export type InputClientSchemaType = z.infer<typeof InputClientSchema>;

export const UpdateClientSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Tolong isi nama client.",
  }),
});

export type UpdateClientSchemaType = z.infer<typeof UpdateClientSchema>;
