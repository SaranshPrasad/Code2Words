
import React, { useEffect, useRef, useState } from "react";
import { data } from "../utils";
import Board from "../Components/Board";
import Level from "../Components/Level";
import Footer from "../Components/Footer";

const HomePage = () => {
  const { levels } = data;

  const [level, setLevel] = useState(0);
  const [start, setStart] = useState(false);

  const questions = levels[level].questions;
  const extraWords = levels[level].extraWords;

  /* ---------------- Question Board ---------------- */

  const [questionBoard, setQuestionBoard] = useState(
    questions.map((q) => Array(q.answer.length).fill(""))
  );

  /* ---------------- Extra Words Board ---------------- */

  const [extraBoard, setExtraBoard] = useState(
    extraWords.map((word) => Array(word.length).fill(""))
  );

  /* ---------------- Refs ---------------- */

  const questionRefs = useRef({});
  const extraRefs = useRef({});

  /* ---------------- Reset Every Level ---------------- */

  useEffect(() => {
    setQuestionBoard(
      questions.map((q) => Array(q.answer.length).fill(""))
    );

    setExtraBoard(
      extraWords.map((word) => Array(word.length).fill(""))
    );
  }, [level]);

  /* ---------------- Check Level Complete ---------------- */

  useEffect(() => {
    const questionSolved = questionBoard.every(
      (row, i) => row.join("") === questions[i].answer
    );

    const extraSolved = extraBoard.every(
      (row, i) => row.join("") === extraWords[i]
    );

    if (
      questionSolved &&
      extraSolved &&
      questionBoard.length &&
      extraBoard.length
    ) {
      setTimeout(() => {
        alert(`🎉 Level ${level + 1} Complete!`);

        if (level < levels.length - 1) {
          setLevel((prev) => prev + 1);
        } else {
          alert("🏆 Congratulations! You completed the game!");
        }
      }, 400);
    }
  }, [questionBoard, extraBoard]);

  /* ---------------- Question Input ---------------- */

  const handleQuestionLogic = (value, row, col) => {
    const updated = questionBoard.map((r) => [...r]);

    updated[row][col] = value.toUpperCase();

    setQuestionBoard(updated);

    if (
      value &&
      col < questions[row].answer.length - 1
    ) {
      questionRefs.current[`${row}-${col + 1}`]?.focus();
    }
  };

  /* ---------------- Extra Input ---------------- */

  const handleExtraLogic = (value, row, col) => {
    const updated = extraBoard.map((r) => [...r]);

    updated[row][col] = value.toUpperCase();

    setExtraBoard(updated);

    if (
      value &&
      col < extraWords[row].length - 1
    ) {
      extraRefs.current[`${row}-${col + 1}`]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300">

      <div className="max-w-7xl mx-auto py-10">

        {
            !start && <h1 className="text-5xl font-black text-center text-white">
          Code2Word
        </h1>
        }

        {!start ? (
          <div className="flex justify-center mt-20">

            <button
              onClick={() => setStart(true)}
              className="px-10 py-5 rounded-full bg-purple-700 text-white text-3xl font-bold"
            >
              START GAME
            </button>

          </div>
        ) : (
          <>
            <Level level={level} />

            <Board
              questions={questions}
              extraWords={extraWords}

              questionBoard={questionBoard}
              extraBoard={extraBoard}

              handleQuestionLogic={handleQuestionLogic}
              handleExtraLogic={handleExtraLogic}

              questionRefs={questionRefs}
              extraRefs={extraRefs}
            />

            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;