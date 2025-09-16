import { prisma } from "@/lib/prisma";
import { seedUsers } from "./seed-users";
import { seedClients } from "./seed-client";

async function main() {
  await seedUsers();
  await seedClients();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
