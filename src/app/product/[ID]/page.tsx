import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });

  if (!product) return notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-2">{product.description}</p>
      <p className="font-bold mb-4">{product.price.toString()} دج</p>
      <p className="text-sm mb-4">المخزون: {product.stock}</p>
      <Link
        href={`/checkout/${product.id}`}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        شراء الآن
      </Link>
    </main>
  );
}
