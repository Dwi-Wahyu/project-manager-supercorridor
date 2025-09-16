import { z } from "zod";

export const TaskStatusSchema = z.enum(["progress", "stuck", "done", "survey"]);
export const TaskPrioritySchema = z.enum(["low", "medium", "high", "critical"]);

export const InputTaskSchema = z.object({
  project_id: z.string().min(1, { message: "Project ID diperlukan." }),
  name: z.string().min(1, { message: "Tolong isi nama task." }),
  lop: z.string().optional(),
  port: z.string().optional(),
  notes: z.string().optional(),
  status: TaskStatusSchema.default("progress").optional(),
  priority: TaskPrioritySchema,
  created_by_user_id: z.string().optional(),
  users_in_charge: z.array(z.object({ label: z.string(), value: z.string() })),
});

export type InputTaskSchemaType = z.infer<typeof InputTaskSchema>;

export const UpdateTaskSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1, { message: "Tolong isi nama task." }),
  lop: z.string().optional(),
  port: z.string().optional(),
  notes: z.string().optional(),
  status: TaskStatusSchema.default("progress").optional(),
  priority: TaskPrioritySchema,
  last_updated_by_user_id: z.string().optional(),
  users_in_charge: z.array(z.object({ label: z.string(), value: z.string() })),
});

export type UpdateTaskSchemaType = z.infer<typeof UpdateTaskSchema>;
