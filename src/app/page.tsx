import { redirect } from "next/navigation";
import LoginForm from "./login-form";
import { auth } from "@/config/auth";
import { Copyright } from "lucide-react";

export default async function LoginPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col md:flex-row">
        <div className="bg-card md:w-[35vw] w-full p-6 h-svh flex flex-col justify-between">
          <div className="flex gap-2 items-center">
            <img src="/supercoridor.png" className="w-[10%]" alt="" />

            <div>
              <h1 className="text-lg font-semibold">PROJECT MANAGEMENT</h1>
              <h1 className="text-sm text-muted-foreground">
                PT TRANS INDONESIA SUPERKORIDOR
              </h1>
            </div>
          </div>

          <LoginForm />

          <h1 className="flex gap-1 items-center text-muted-foreground text-xs justify-center">
            Copyright
            <Copyright className="w-4 h-4" />
            PT SkytelIndo 2025
          </h1>
        </div>

        <div className="grow hidden bg-gradient-to-b from-primary to-background md:flex justify-center items-center">
          <div className="p-4 bg-background rounded-xl">
            <img src="/login-logo.svg" className="w-[35vw]" alt="" />
          </div>
        </div>
      </div>
    );
  }

  const now = new Date();
  const expires = new Date(session.expires);

  if (now > expires || !session) {
    return (
      <div>
        <div>
          <LoginForm />
        </div>
      </div>
    );
  }

  redirect("/admin");
}
