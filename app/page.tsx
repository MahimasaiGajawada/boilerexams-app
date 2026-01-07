import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Link
        href="/questions"
        className="btn btn-primary btn-lg w-full sm:w-auto font-semibold transition-all duration-200 hover:scale-105"
      >
        Click to get started!
      </Link>
    </main>
  );
}
