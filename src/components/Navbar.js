import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Next.js Store
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-400">
          Home
        </Link>
        <Link
          href="/items"
          className="hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          Items
        </Link>
      </div>
    </nav>
  );
}
