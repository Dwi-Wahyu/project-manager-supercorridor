import { z } from "zod";

export const UpsertRegionalSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "Tolong isi regional.",
  }),
});

export type UpsertRegionalSchemaType = z.infer<typeof UpsertRegionalSchema>;
