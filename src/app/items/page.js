import Link from 'next/link';

async function getItems() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/items`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to fetch items: ${res.status}`);
  }

  return res.json();
}

export default async function ItemsPage() {
  let items;

  try {
    items = await getItems();
  } catch {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Could not load items</h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          Please make sure MongoDB is running and try again.
        </p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">No items yet</h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          Add some items to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-8 py-12">
      <h1 className="text-2xl font-bold mb-8">Items</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item._id}>
            <Link
              href={`/items/${item._id}`}
              className="block rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            >
              <h2 className="text-lg font-semibold">{item.name}</h2>
              {item.description && (
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {item.description}
                </p>
              )}
              <p className="mt-2 text-sm font-medium">
                ${item.price?.toFixed(2)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
