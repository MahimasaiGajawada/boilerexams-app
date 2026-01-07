"use client";
import { useState, useRef } from "react";
import Link from "next/link";

interface QuestionData {
  body: string;
  solution: number[];
  answerChoices: { id: string; index: number; body: string }[];
}

interface QuestionPageProps {
  data: QuestionData;
}

export default function QuestionPage({ data }: QuestionPageProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [eliminated, setEliminated] = useState<number[]>([]);
  const [endMessage, setEndMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const toggleEliminate = (index: number) => {
    if (eliminated.includes(index)) {
      setEliminated(eliminated.filter((i) => i !== index));
    } else {
      setEliminated([...eliminated, index]);
    }
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    setEndMessage(
      selectedAnswer === data.solution[0] ? "Correct!" : "Wrong, try again!"
    );

    modalRef.current?.showModal();
  };

  const reset = () => {
    setEndMessage(null);
    setEliminated([]);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {data.body}
            </h2>
            <div className="h-1 w-24 bg-indigo-600 rounded-full"></div>
          </div>

          <ol type="A" className="space-y-3 mb-8">
            {data.answerChoices.map((choice, idx) => {
              const isEliminated = eliminated.includes(choice.index);
              const isSelected = selectedAnswer === choice.index;

              return (
                <li key={choice.id}>
                  <div className="flex items-stretch gap-3">
                    <button
                      onClick={() => setSelectedAnswer(choice.index)}
                      disabled={isEliminated}
                      className={`flex-1 px-5 py-4 rounded-lg text-left font-medium ${
                        isSelected
                          ? "bg-indigo-600 text-white"
                          : "bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 border border-gray-300 dark:border-slate-600"
                      } ${isEliminated ? "line-through opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300"
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{choice.body}</span>
                      </div>
                    </button>

                    <button
                      onClick={() => toggleEliminate(choice.index)}
                      className={`px-4 py-2 rounded-lg min-w-[100px] font-semibold flex items-center justify-center gap-2 ${
                        isEliminated
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 border border-amber-300 dark:border-amber-700"
                          : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 border border-gray-300 dark:border-slate-600"
                      }`}
                      title={isEliminated ? "Restore this option" : "Eliminate this option"}
                    >
                      {isEliminated ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Undo</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>Eliminate</span>
                        </>
                      )}
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>

          <button
            onClick={submitAnswer}
            className="w-full px-6 py-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            disabled={selectedAnswer === null}
          >
            <span>Submit Answer</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>

        <dialog
          ref={modalRef}
          onClose={reset}
          className="modal backdrop:bg-black/50"
        >
          <div className="modal-box text-center bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 shadow-lg max-w-md rounded-lg">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              endMessage === "Correct!"
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            }`}>
              {endMessage === "Correct!" ? (
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <h3 className={`font-bold text-2xl mb-2 ${
              endMessage === "Correct!"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}>
              {endMessage}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {endMessage === "Correct!"
                ? "Great job! You got it right."
                : "Don't worry, keep practicing and you'll improve!"}
            </p>
            <div className="modal-action justify-center">
              <form method="dialog">
                <button
                  onClick={reset}
                  className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold"
                >
                  Try Again
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
