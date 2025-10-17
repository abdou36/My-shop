import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const settings = await prisma.systemSettings.findFirst();
  return NextResponse.json(settings);
}
