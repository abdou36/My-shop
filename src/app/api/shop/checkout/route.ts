import { prisma } from '@/lib/prisma'
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const productId = body.productId;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.stock < 1) {
    return NextResponse.json({ error: "المنتج غير متوفر" }, { status: 400 });
  }

  const code = await prisma.productCode.findFirst({
    where: { productId, used: false },
  });

  if (!code) {
    return NextResponse.json({ error: "لا توجد أكواد متاحة" }, { status: 400 });
  }

  await prisma.productCode.update({
    where: { id: code.id },
    data: { used: true },
  });

  await prisma.product.update({
    where: { id: productId },
    data: { stock: product.stock - 1 },
  });

  await prisma.order.create({
    data: {
      user: { connect: { id: 1 } }, // مؤقتًا: المستخدم رقم 1
      product: { connect: { id: productId } },
      total: product.price,
      status: "paid",
    },
  });

  return NextResponse.json({ code: code.code });