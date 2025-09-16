"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  InputProjectSchema,
  InputProjectSchemaType,
} from "@/validations/schemas/project";
import { createProject } from "../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllClient } from "../../clients/queries";
import { ProjectCategory } from "@/app/generated/prisma";

export function CreateProjectForm({
  allClient,
  category,
}: {
  allClient: Awaited<ReturnType<typeof getAllClient>>;
  category: ProjectCategory;
}) {
  const router = useRouter();

  const form = useForm<InputProjectSchemaType>({
    resolver: zodResolver(InputProjectSchema),
    defaultValues: {
      regional: "",
      pop: "",
      project_number: "",
      name: "",
      bep: "",
      spk_number: "",
      investment_value: "",
      toc: "",
      mos: "",
      status: "",
      rfs_date: "",
      home_pass: "",
      home_port: 0,
      home_connected: 0,
      remaining: 0,
      occ: 0,
      category,
      revenue: "",
      client_id: "",
      year: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Terjadi kesalahan saat menyimpan data project. Silakan coba lagi."
  );

  const onSubmit = async (payload: InputProjectSchemaType) => {
    setIsLoading(true);

    const result = await createProject(payload);

    if (result.success) {
      setIsSuccessOpen(true);
      setTimeout(() => {
        router.push("/admin/projects/" + payload.category);
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ftth">FTTH</SelectItem>
                          <SelectItem value="backbone">Backbone</SelectItem>
                        </SelectContent>
                      </Select>
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
                  name="regional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regional</FormLabel>
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
                        <div className="relative">
                          <Input
                            {...field}
                            type="number"
                            className="peer pe-13"
                          />
                          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                            Rp
                          </span>
                        </div>
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
                        <Input type="number" {...field} />
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
                        <div className="relative">
                          <Input
                            {...field}
                            type="number"
                            className="peer pe-13"
                          />
                          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                            %
                          </span>
                        </div>
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
                        <div className="relative">
                          <Input
                            {...field}
                            type="number"
                            className="peer pe-13"
                          />
                          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                            Rp
                          </span>
                        </div>
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
                        <Select onValueChange={field.onChange}>
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant={"secondary"} asChild>
                  <Link href="/admin/projects">
                    <IconChevronLeft />
                    Kembali
                  </Link>
                </Button>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <IconLoader className="animate-spin" />
                      Loading
                    </>
                  ) : (
                    <>
                      <IconPlus />
                      Submit
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
