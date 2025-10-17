import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const codes = await prisma.productCode.findMany({
    include: { product: true },
  });
  return NextResponse.json(codes);
}
