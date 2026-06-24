import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getItem(id) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/items/${id}`, { cache: 'no-store' });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch item: ${res.status}`);

  return res.json();
}

export default async function ItemDetailPage({ params }) {
  const { id } = await params;
  let item;

  try {
    item = await getItem(id);
  } catch {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Could not load item</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
          Something went wrong while loading this item.
        </p>
        <Link
          href="/items"
          className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Back to items
        </Link>
      </div>
    );
  }

  if (!item) notFound();

  return (
    <div className="mx-auto max-w-2xl px-8 py-12">
      <Link
        href="/items"
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        &larr; Back to items
      </Link>
      <div className="mt-8">
        <h1 className="text-3xl font-bold">{item.name}</h1>
        {item.description && (
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {item.description}
          </p>
        )}
        <p className="mt-6 text-2xl font-semibold">${item.price?.toFixed(2)}</p>
        <p className="mt-8 text-xs text-zinc-400">
          Added {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
