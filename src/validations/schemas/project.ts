import { z } from "zod";

export const InputProjectSchema = z.object({
  regional_id: z.string().min(1, { error: "Tolong Pilih Regional" }),
  kap: z.string().optional(),
  area: z.string().optional(),
  pop: z.string().optional(),
  project_number: z.string().optional(),
  category: z.enum(["ftth", "backbone"]),
  name: z.string().min(1, {
    message: "Tolong isi nama.",
  }),
  bep: z.string().optional(),
  spk_number: z.string().optional(),
  investment_value: z.string().optional(),
  toc: z.string().optional(),
  mos: z.string().optional(),
  status: z.string().optional(),
  rfs_date: z.string().optional(),
  home_pass: z.string().optional(),
  home_port: z.coerce.number().int().optional(),
  home_connected: z.coerce.number().int().optional(),
  remaining: z.coerce.number().int().optional(),
  occ: z.coerce.number().int().optional(),
  revenue: z.string().optional(),
  client_id: z.string().min(1, { error: "Tolong Pilih Client" }),
  year: z.string().optional(),
  done: z.boolean().optional(),
});

export type InputProjectSchemaType = z.infer<typeof InputProjectSchema>;

export const UpdateProjectSchema = z.object({
  id: z.string(),
  regional_id: z.string().min(1, { error: "Tolong Pilih Regional" }),
  kap: z.string().optional(),
  area: z.string().optional(),
  pop: z.string().optional(),
  project_number: z.string().optional(),
  name: z.string().min(1, {
    message: "Tolong isi nama.",
  }),
  bep: z.string().optional(),
  spk_number: z.string().optional(),
  investment_value: z.string().optional(),
  toc: z.string().optional(),
  mos: z.string().optional(),
  mitra: z.string().optional(),
  status: z.string().optional(),
  rfs_date: z.string().optional(),
  home_pass: z.string().optional(),
  home_port: z.coerce.number().int().optional(),
  home_connected: z.coerce.number().int().optional(),
  remaining: z.coerce.number().int().optional(),
  occ: z.coerce.number().int().optional(),
  revenue: z.string().optional(),
  client_id: z.string().min(1, { error: "Tolong Pilih Client" }),
  year: z.string().optional(),
  done: z.boolean().optional(),
});

export type UpdateProjectSchemaType = z.infer<typeof UpdateProjectSchema>;
