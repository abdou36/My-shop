import { prisma } from "../src/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const adminPass = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {},
    create: { username: "admin", password: adminPass, role: "admin" },
  });

  const itunes = await prisma.product.create({
    data: {
      name: "بطاقة iTunes 25$",
      description: "بطاقة شحن iTunes بقيمة 25 دولار",
      price: 3500,
      category: "iTunes",
      stock: 0,
    },
  });

  const google = await prisma.product.create({
    data: {
      name: "بطاقة Google Play 50$",
      description: "بطاقة شحن Google Play بقيمة 50 دولار",
      price: 7000,
      category: "Google Play",
      stock: 0,
    },
  });

  await prisma.productCode.createMany({
    data: [
      { productId: itunes.id, code: "ITUNES-TEST-1111" },
      { productId: itunes.id, code: "ITUNES-TEST-2222" },
      { productId: google.id, code: "GOOGLE-TEST-3333" },
      { productId: google.id, code: "GOOGLE-TEST-4444" },
    ],
  });

  const itunesStock = await prisma.productCode.count({
    where: { productId: itunes.id, used: false },
  });
  const googleStock = await prisma.productCode.count({
    where: { productId: google.id, used: false },
  });

  await prisma.product.update({ where: { id: itunes.id }, data: { stock: itunesStock } });
  await prisma.product.update({ where: { id: google.id }, data: { stock: googleStock } });

  await prisma.systemSettings.create({
    data: {
      defaultEmail: "reports@yourshop.com",
      defaultCronExpr: "0 8 * * *",
      defaultReportType: "activity",
      defaultFormat: "excel",
    },
  });

  console.log("✅ Seed done: admin + products + codes + settings");
}

main().finally(() => prisma.$disconnect());
