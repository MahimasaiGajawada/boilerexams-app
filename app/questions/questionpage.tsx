"use client";
import { useState } from "react";
import Link from "next/link";

// types for our data
interface QuestionData {
  body: string;
  solution: number[];
  answerChoices: { id: string; index: number; body: string }[];
}

interface QuestionPageProps {
  data: QuestionData;
}

export default function QuestionPage({ data }: QuestionPageProps) {
  // state for the quiz
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [eliminated, setEliminated] = useState<number[]>([]);
  const [endMessage, setEndMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // for the popup

  // handle eliminating options
  const toggleEliminate = (index: number) => {
    if (eliminated.includes(index)) {
      // remove from eliminated
      setEliminated(eliminated.filter((i) => i !== index));
    } else {
      // add to eliminated
      setEliminated([...eliminated, index]);
    }
  };

  // check if answer is right
  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    // check against solution
    if (selectedAnswer === data.solution[0]) {
      setEndMessage("Correct!");
    } else {
      setEndMessage("Wrong, try again!");
    }

    // show the result
    setShowModal(true);
  };

  // reset everything to try again
  const reset = () => {
    setEndMessage(null);
    setEliminated([]);
    setSelectedAnswer(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-6">
          <Link
            href="/"
            className="btn btn-ghost btn-sm gap-2"
          >
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4 text-black">
              {data.body}
            </h2>
            <div className="h-1 w-full bg-primary rounded-full mb-6"></div>

            <div className="space-y-4">
              {data.answerChoices.map((choice, i) => {
                // check states
                const isEliminated = eliminated.includes(choice.index);
                const isSelected = selectedAnswer === choice.index;

                // determine button classes
                let buttonClass = "btn btn-block justify-start h-auto py-4 text-left ";

                if (isSelected) {
                  buttonClass += "btn-primary ";
                } else {
                  buttonClass += "btn-outline "; // outline for unselected
                }

                if (isEliminated) {
                  buttonClass += "btn-disabled opacity-50 line-through";
                }

                return (
                  <div key={choice.id} className="flex gap-2">
                    <button
                      onClick={() => setSelectedAnswer(choice.index)}
                      disabled={isEliminated}
                      className={`flex-1 ${buttonClass}`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <span className={`badge ${isSelected ? "badge-outline badge-lg" : "badge-ghost badge-lg"}`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1 whitespace-normal">{choice.body}</span>
                      </div>
                    </button>

                    <button
                      onClick={() => toggleEliminate(choice.index)}
                      className={`btn ${isEliminated ? "btn-warning" : "btn-neutral"} btn-square`}
                      title={isEliminated ? "Undo" : "Eliminate"}
                    >
                      {isEliminated ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="card-actions justify-end mt-8">
              <button
                onClick={submitAnswer}
                className="btn btn-primary btn-wide"
                disabled={selectedAnswer === null}
              >
                Submit Answer
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${endMessage === "Correct!" ? "bg-success/20 text-success" : "bg-error/20 text-error"
                }`}>
                {endMessage === "Correct!" ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>

              <h3 className={`font-bold text-2xl mb-2 ${endMessage === "Correct!" ? "text-success" : "text-error"
                }`}>
                {endMessage}
              </h3>

              <p className="py-4 text-black">
                {endMessage === "Correct!"
                  ? "Great job!"
                  : "Keep practicing!"}
              </p>

              <div className="modal-action justify-center">
                <button onClick={reset} className="btn btn-primary">
                  Try Again
                </button>
              </div>
            </div>
            <div className="modal-backdrop" onClick={reset}></div>
          </div>
        )}
      </div>
    </div>
  );
}
