
import React from "react";

const Board = ({
  questions,
  extraWords,

  questionBoard,
  extraBoard,

  handleQuestionLogic,
  handleExtraLogic,

  questionRefs,
  extraRefs,
}) => {
  return (
    <div className="space-y-12 mt-10">

      {/* ---------------- QUESTIONS ---------------- */}

      <div className="space-y-8">

        <h2 className="text-3xl font-bold text-center text-white">
          Guess the Answers
        </h2>

        {questions.map((question, i) => {
          const numbers = question.answer
            .split("")
            .map(
              (char) =>
                char.charCodeAt(0) -
                "A".charCodeAt(0) +
                1
            );

          return (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-xl p-6 flex justify-between items-center"
            >
              {/* Sentence */}

              <div className="w-[55%]">
                <h3 className="font-bold text-lg">
                  {i + 1}. {question.sentence}
                </h3>
              </div>

              {/* Inputs */}

              <div className="flex gap-3">

                {numbers.map((num, j) => (

                  <div
                    key={j}
                    className="flex flex-col items-center gap-2"
                  >

                    <input
                      ref={(el) =>
                        (questionRefs.current[
                          `${i}-${j}`
                        ] = el)
                      }

                      type="text"

                      maxLength={1}

                      value={questionBoard[i][j]}

                      onChange={(e) =>
                        handleQuestionLogic(
                          e.target.value,
                          i,
                          j
                        )
                      }

                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !questionBoard[i][j] &&
                          j > 0
                        ) {
                          questionRefs.current[
                            `${i}-${j - 1}`
                          ]?.focus();
                        }
                      }}

                      className={`w-12 h-12 rounded-xl border-2 text-center text-xl font-bold outline-none transition

                        ${
                          questionBoard[i][j] === ""
                            ? "border-gray-300"

                            : questionBoard[i][j] ===
                              question.answer[j]

                            ? "border-green-500 bg-green-100"

                            : "border-red-500 bg-red-100"
                        }

                      `}
                    />

                    <span className="font-bold text-indigo-700">
                      {num}
                    </span>

                  </div>

                ))}

              </div>

            </div>
          );
        })}
      </div>

      {/* Divider */}

      <div className="border-t-4 border-dashed border-white"></div>

      {/* ---------------- EXTRA WORDS ---------------- */}

      <div className="space-y-8">

        <h2 className="text-3xl font-bold text-center text-white">
          Extra Words
        </h2>

        <div className="grid grid-cols-2 gap-8">

          {extraWords.map((word, i) => {

            const numbers = word
              .split("")
              .map(
                (char) =>
                  char.charCodeAt(0) -
                  "A".charCodeAt(0) +
                  1
              );

            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-xl p-5"
              >
                <div className="flex gap-2 justify-center">

                  {numbers.map((num, j) => (

                    <div
                      key={j}
                      className="flex flex-col items-center gap-2"
                    >

                      <input
                        ref={(el) =>
                          (extraRefs.current[
                            `${i}-${j}`
                          ] = el)
                        }

                        type="text"

                        maxLength={1}

                        value={extraBoard[i][j]}

                        onChange={(e) =>
                          handleExtraLogic(
                            e.target.value,
                            i,
                            j
                          )
                        }

                        onKeyDown={(e) => {
                          if (
                            e.key === "Backspace" &&
                            !extraBoard[i][j] &&
                            j > 0
                          ) {
                            extraRefs.current[
                              `${i}-${j - 1}`
                            ]?.focus();
                          }
                        }}

                        className={`w-10 h-10 rounded-lg border-2 text-center font-bold outline-none transition

                          ${
                            extraBoard[i][j] === ""
                              ? "border-gray-300"

                              : extraBoard[i][j] ===
                                word[j]

                              ? "border-green-500 bg-green-100"

                              : "border-red-500 bg-red-100"
                          }

                        `}
                      />

                      <span className="text-sm font-bold text-indigo-700">
                        {num}
                      </span>

                    </div>

                  ))}

                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

export default Board;