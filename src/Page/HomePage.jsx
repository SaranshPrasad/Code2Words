import React, { useEffect, useRef, useState } from 'react'
import { data } from '../utils';
import Board from '../Components/Board';
import Level from '../Components/Level';
import Footer from '../Components/Footer';

const HomePage = () => {
    const { levels } = data;
    const [level, setLevel] = useState(0);
    const [start, setStart] = useState(false);
    const words = levels[level].words;
    const [board, setBoard] = useState(
        words.map(word => Array(word.length).fill(""))
    );
    const inputRefs = useRef([]);
    useEffect(() => {
        const timer = setTimeout(() => {
            const allFilled = board.every(row =>
                row.every(letter => letter !== "")
            );

            if (!allFilled) return;

            const allCorrect = board.every((row, index) =>
                row.join("") === words[index]
            );

            if (allCorrect) {
                alert(`🎉 Congratulations! Level ${level + 1}  Complete`);
                const nextLevel = level + 1;
                setLevel(nextLevel);

            } else {
                alert("❌ Some words are incorrect.");
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [board]);
    const answers = words.map(word =>
        word.split("").map(
            char => char.charCodeAt(0) - "A".charCodeAt(0) + 1
        )
    );


   
    const handleLogic = (value, i, b) => {
        const newBoard = board.map(row => [...row]);
        newBoard[i][b] = value.toUpperCase();
        setBoard(newBoard);
        if (value && b < words[i].length - 1) {
            inputRefs.current[`${i}-${b + 1}`]?.focus();
        }
    }
    const handleStart = () => {

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 relative overflow-hidden">

            {/* Enhanced Decorative Elements */}

            <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full blur-3xl top-20 -right-40 opacity-25 animate-pulse delay-1000"></div>

            <div className="relative z-10 max-w-7xl mx-auto py-12 px-4">

                {/* Playful Header */}
                <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
                    <h1 className="text-5xl font-black  drop-shadow-lg text-white">
                        Code2Word
                    </h1>
                    <div className="mt-4 inline-block bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full shadow-2xl border-4 border-dashed border-purple-400 transform -rotate-1">
                        <p className="text-xl font-bold text-gray-700">
                            🔢 Crack the code & spell the word! 🔤
                        </p>
                    </div>
                </div>

                {
                    !start ? (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
                            <div className="relative group">
                                <button
                                    onClick={() => setStart(true)}
                                    className="relative px-16 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full text-3xl font-black shadow-2xl border-4 border-white transform transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.8)]"
                                >
                                    <span className="flex items-center gap-4">
                                        <span className="text-4xl animate-bounce">🎮</span>
                                        START GAME
                                        <span className="text-4xl animate-bounce delay-150">🚀</span>
                                    </span>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-fadeIn">
                            <div className="transform transition-all duration-500 hover:scale-105">
                                <Level level={level} />
                            </div>
                            <div className="animate-slideUp">
                                <Board
                                    board={board}
                                    answers={answers}
                                    handleLogic={handleLogic}
                                    words={words}
                                    inputRefs={inputRefs}
                                />
                            </div>
                            <Footer />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default HomePage