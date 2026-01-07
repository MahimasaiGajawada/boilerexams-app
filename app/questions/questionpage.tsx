"use client";
import React, { useState, useRef } from "react";

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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div>
        <fieldset className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <p className="mb-6 text-lg font-semibold text-black">{data.body}</p>

          <ol type="A" className="space-y-4">
            {data.answerChoices.map((choice) => {
              const isEliminated = eliminated.includes(choice.index);
              const isSelected = selectedAnswer === choice.index;

              return (
                <li key={choice.id} className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedAnswer(choice.index)}
                    disabled={isEliminated}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-200 font-medium ${
                      isSelected
                        ? "bg-black text-white hover:bg-gray-800 border-2 border-black shadow-md"
                        : "bg-white text-black hover:bg-gray-50 border-2 border-black shadow-sm"
                    } ${isEliminated ? "line-through opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {choice.body}
                  </button>

                  <button
                    onClick={() => toggleEliminate(choice.index)}
                    className={`px-4 py-2 rounded-lg min-w-[100px] font-semibold transition-all duration-200 shadow-sm ${
                      isEliminated
                        ? "bg-yellow-400 text-black hover:bg-yellow-500 border-2 border-yellow-600"
                        : "bg-gray-200 text-black hover:bg-gray-300 border-2 border-gray-400"
                    }`}
                  >
                    {isEliminated ? "Undo" : "Eliminate"}
                  </button>
                </li>
              );
            })}
          </ol>

          <button
            onClick={submitAnswer}
            className="w-full mt-6 px-4 py-3 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 border-2 border-yellow-600 font-semibold transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-400"
            disabled={selectedAnswer === null}
          >
            Submit
          </button>
        </fieldset>

        <dialog ref={modalRef} onClose={reset} className="modal">
          <div className="modal-box text-center bg-white border-2 border-black">
            <h3 className="font-bold text-xl text-yellow-600">{endMessage}</h3>
            <div className="modal-action justify-center mt-4">
              <form method="dialog">
                <button className="px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 border-2 border-black font-semibold transition-all duration-200 shadow-md">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
