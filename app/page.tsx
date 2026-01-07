import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome to{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              BoilerExams
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Master your exams with interactive practice questions
          </p>
        </div>
        
        <div className="pt-8">
          <Link
            href="/questions"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 text-lg"
          >
            <span>Get Started</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
