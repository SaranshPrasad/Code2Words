
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
    <div className="mt-6 sm:mt-8 lg:mt-10 space-y-10 px-4 sm:px-6 lg:px-0">
      {/* ---------------- QUESTIONS ---------------- */}

      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
          Guess the Answers
        </h2>

        {questions.map((question, i) => {
          const numbers = question.answer
            .split("")
            .map(
              (char) =>
                char.charCodeAt(0) - "A".charCodeAt(0) + 1
            );

          return (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between"
            >
              {/* Sentence */}

              <div className="w-full lg:w-[55%]">
                <h3 className="font-bold text-base sm:text-lg leading-relaxed">
                  {i + 1}. {question.sentence}
                </h3>
              </div>

              {/* Inputs */}

              <div className="flex flex-wrap justify-center lg:justify-end gap-2 sm:gap-3">
                {numbers.map((num, j) => (
                  <div
                    key={j}
                    className="flex flex-col items-center gap-1 sm:gap-2"
                  >
                    <input
                      ref={(el) =>
                        (questionRefs.current[`${i}-${j}`] = el)
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
                      className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl border-2 text-center text-base sm:text-lg md:text-xl font-bold outline-none transition
                      ${
                        questionBoard[i][j] === ""
                          ? "border-gray-300"
                          : questionBoard[i][j] ===
                            question.answer[j]
                          ? "border-green-500 bg-green-100"
                          : "border-red-500 bg-red-100"
                      }`}
                    />

                    <span className="text-xs sm:text-sm font-bold text-indigo-700">
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

      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
          Extra Words
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
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
                className="bg-white rounded-2xl shadow-xl p-4 sm:p-5"
              >
                <div className="flex flex-wrap justify-center gap-2">
                  {numbers.map((num, j) => (
                    <div
                      key={j}
                      className="flex flex-col items-center gap-1 sm:gap-2"
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
                        className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg border-2 text-center text-sm sm:text-base font-bold outline-none transition
                        ${
                          extraBoard[i][j] === ""
                            ? "border-gray-300"
                            : extraBoard[i][j] ===
                              word[j]
                            ? "border-green-500 bg-green-100"
                            : "border-red-500 bg-red-100"
                        }`}
                      />

                      <span className="text-[10px] sm:text-xs md:text-sm font-bold text-indigo-700">
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