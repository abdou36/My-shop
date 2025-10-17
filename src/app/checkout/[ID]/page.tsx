"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string };
}

export default function CheckoutPage({ params }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch(`/api/shop/checkout`, {
      method: "POST",
      body: JSON.stringify({ productId: Number(params.id) }),
    });

    if (res.ok) {
      const data = await res.json();
      alert("✅ تم الدفع واستلام الكود: " + data.code);
      router.push("/");
    } else {
      alert("❌ فشل الدفع");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">إتمام عملية الشراء</h1>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "جاري المعالجة..." : "ادفع الآن"}
      </button>
    </main>
  );
}
