import { prisma } from "@/lib/prisma";

export async function seedClients() {
  console.log("Starting Seeding client.");

  const clientNames = [
    "PT. ADHI DJAYA MANDIRI",
    "CV. Intech Multi Solution",
    "PT. J AND  JC  Cosulting",
    "PT. Anugrah Tunggal Mandiri",
    "PT. Cipta Utama Karya",
    "Team Sipil Jabo",
    "PT. Teguh Satia Optik",
    "CV. Perkasa Raya",
    "PT. Graha Prima Agug",
    "PT. Sakti Wijaya Network",
    "PT. Kusumah Prima Koneksindo",
    "PT. HABLUN CITRAMAS PERSADA",
    "PT. Indotelco Cemerlang Abadi",
    "PT. Berkah Serikat Mandiri",
    "PT. CENTRALINDO PANCA SAKTI",
    "SETKO",
    "Mandor Kasran",
    "IN HOUSE",
    "PT. J&JC CONSULTING",
    "CV. BITRAS",
    "PT. FANAUVI INFOTECH GEMILANG",
    "PT. SENTRA ENERGI TEKNIK KOMUNIKASI",
    "MANDOR YUDI",
    "MANDOR MIFTAHUL AKHI",
    "MANDOR DANU",
    "PT. HENDRIK REZI KARYA UTAMA",
    "INHOUSE",
  ];

  const uniqueClientNames = [...new Set(clientNames)];

  for (const name of uniqueClientNames) {
    await prisma.client.create({
      data: {
        name: name,
      },
    });
  }

  console.log("Seeding client completed successfully.");
}
