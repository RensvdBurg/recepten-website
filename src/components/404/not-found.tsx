import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex min-h-[300px] flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-gray-600">
          De pagina die je zoekt bestaat niet.
        </p>

        <Link
          href="/"
          className="mt-6 rounded bg-black hover:bg-zinc-500 px-4 py-2 text-white"
        >
          Terug naar home
        </Link>
      </div>
    </>
  );
}