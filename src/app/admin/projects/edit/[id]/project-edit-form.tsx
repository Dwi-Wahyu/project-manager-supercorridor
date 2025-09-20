"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { IconChevronLeft, IconLoader, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { NotificationDialog } from "@/components/notification-dialog";
import { useRouter } from "nextjs-toploader/app";
import {
  UpdateProjectSchema,
  UpdateProjectSchemaType,
} from "@/validations/schemas/project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllClient } from "@/app/admin/clients/queries";
import { updateProject } from "../../actions";
import { getProjectById } from "../../queries";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";
import { NavigationButton } from "@/app/_components/navigation-button";
import { getRegionals } from "@/app/admin/pengaturan-aplikasi/queries";

export function EditProjectForm({
  allClient,
  initialData,
  regionals,
}: {
  allClient: Awaited<ReturnType<typeof getAllClient>>;
  initialData: NonNullable<Awaited<ReturnType<typeof getProjectById>>>;
  regionals: Awaited<ReturnType<typeof getRegionals>>;
}) {
  const router = useRouter();

  const form = useForm<UpdateProjectSchemaType>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      id: initialData.id,
      regional_id: initialData.regional_id,
      kap: initialData.kap ?? "",
      area: initialData.area ?? "",
      pop: initialData.pop ?? "",
      project_number: initialData.project_number ?? "",
      name: initialData.name,
      bep: initialData.bep ?? "",
      spk_number: initialData.spk_number ?? "",
      investment_value: initialData.investment_value ?? "",
      toc: initialData.toc ?? "",
      mos: initialData.mos ?? "",
      status: initialData.status ?? "",
      rfs_date: initialData.rfs_date ?? "",
      home_pass: initialData.home_pass ?? "",
      home_port: initialData.home_port ?? 0,
      home_connected: initialData.home_connected ?? 0,
      remaining: initialData.remaining ?? 0,
      occ: initialData.occ ?? 0,
      revenue: initialData.revenue ?? "",
      client_id: initialData.client?.id ?? "",
      year: initialData.year ?? "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Terjadi kesalahan saat menyimpan data project. Silakan coba lagi."
  );

  const onSubmit = async (payload: UpdateProjectSchemaType) => {
    setIsLoading(true);

    const result = await updateProject(payload);

    console.log(payload);

    if (result.success) {
      setIsSuccessOpen(true);
      setTimeout(() => {
        router.push("/admin/projects/" + initialData.category);
      }, 2000);
    } else {
      setErrorMessage(result.error.message);
      setIsErrorOpen(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full flex justify-center">
      <NotificationDialog
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Aksi Berhasil!"
        message="Data project berhasil disimpan."
        variant="success"
      />

      <NotificationDialog
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        title="Gagal menyimpan data project!"
        message={errorMessage}
        variant="error"
      />

      <Card className="w-full relative shadow-none">
        <CardHeader>
          <CardTitle>Input Project</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Project</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="project_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Project</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="regional_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regional</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={initialData.regional_id}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {regionals.map((regional, idx) => (
                              <SelectItem key={idx} value={regional.id}>
                                {regional.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="kap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>KAP</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>POP</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BEP</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="spk_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor SPK</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="investment_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nilai Investasi</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="toc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TOC</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MOS</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rfs_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal RFS</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="home_pass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Pass</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="home_port"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Port</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="home_connected"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home Connected</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="remaining"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sisa</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occ"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OCC</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revenue</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="client_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={initialData.client_id}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allClient.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={initialData.year ?? ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["2024", "2025", "2026"].map((year, idx) => (
                              <SelectItem key={idx} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="done"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project telah Selesai</FormLabel>
                      <FormControl>
                        <FormLabel htmlFor="project_selesai_checkbox">
                          <Checkbox
                            id="project_selesai_checkbox"
                            onCheckedChange={field.onChange}
                            defaultChecked={initialData.done}
                          />
                          Tandai Project Ini Telah Selesai
                        </FormLabel>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                <NavigationButton
                  url={"/admin/projects/" + initialData.category}
                >
                  <IconChevronLeft />
                  Kembali
                </NavigationButton>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <IconLoader className="animate-spin" />
                      Loading
                    </>
                  ) : (
                    <>
                      <Save />
                      Simpan
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
