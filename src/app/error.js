'use client';

import { useEffect } from 'react';

const SUPPRESSED_ERRORS = [
  'ECONNREFUSED',
  'ETIMEDOUT',
  'NETWORK_ERROR',
];

function isSuppressed(error) {
  if (!error?.message) return false;
  return SUPPRESSED_ERRORS.some((code) => error.message.includes(code));
}

export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    if (!isSuppressed(error)) {
      console.error('Unhandled error:', error);
    }
  }, [error]);

  if (isSuppressed(error)) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md">
          We could not load this page right now. This is likely a temporary
          issue.
        </p>
        <button
          onClick={() => unstable_retry()}
          className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 py-16 text-center">
      <h2 className="text-xl font-semibold mb-2">Unexpected error</h2>
      <p className="text-zinc-500 dark:text-zinc-400 mb-1 max-w-md">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <p className="text-xs text-zinc-400 mb-6">
        Digest: {error?.digest || 'N/A'}
      </p>
      <button
        onClick={() => unstable_retry()}
        className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Try again
      </button>
    </div>
  );
}
