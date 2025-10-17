import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🛒 متجر البطاقات الرقمية</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="border rounded p-4 bg-white shadow hover:shadow-md transition">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-slate-600">{p.description}</p>
            <p className="mt-2 font-bold">{p.price.toString()} دج</p>
            <p className="text-xs mt-1">المخزون: {p.stock}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
  