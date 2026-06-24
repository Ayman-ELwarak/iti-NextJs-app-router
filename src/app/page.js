import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Next.js Store
      </h1>
      <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">
        Browse and manage your items with Next.js 16, MongoDB, and Mongoose.
      </p>
      <Link
        href="/items"
        className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Browse Items
      </Link>
    </div>
  );
}
