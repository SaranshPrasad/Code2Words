import React from 'react'

const Board = ({board, answers,handleLogic,words, inputRefs}) => {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-8 items-start">

                    {board.map((w, i) => (
                        <div
                            key={i}
                            className="group relative transform hover:scale-105 transition-all duration-300"
                        >
                           
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl px-10 py-8 border-4 border-white">

                             
                                <div className="absolute -top-5 -left-5 bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-black shadow-xl border-4 border-white transform rotate-12 group-hover:rotate-0 transition-transform">
                                    {i + 1}
                                </div>

                                <div className="flex gap-4">
                                    {w.map((a, b) => (

                                        <div
                                            key={b}
                                            className="flex flex-col items-center gap-3"
                                        >

                                            <input
                                                ref={(el) => {
                                                    inputRefs.current[`${i}-${b}`] = el;
                                                }}
                                                type="text"
                                                maxLength={1}
                                                value={board[i][b]}
                                                onChange={(e) =>
                                                    handleLogic(e.target.value, i, b)
                                                }
                                                onKeyDown={(e) => {
                                                    if (
                                                        e.key === "Backspace" &&
                                                        !board[i][b] &&
                                                        b > 0
                                                    ) {
                                                        inputRefs.current[
                                                            `${i}-${b - 1}`
                                                        ]?.focus();
                                                    }
                                                }}
                                                className={`w-16 h-16 rounded-2xl border-4 text-center text-2xl font-black transition-all duration-200 outline-none shadow-lg transform hover:scale-110
                                        ${board[i][b] === ""
                                                        ? "border-purple-300 bg-gradient-to-br from-gray-50 to-purple-50 text-gray-400"
                                                        : words[i][b] === board[i][b]
                                                            ? "border-green-400 bg-gradient-to-br from-green-100 to-emerald-200 text-green-700 animate-bounce shadow-green-300"
                                                            : "border-red-400 bg-gradient-to-br from-red-100 to-pink-200 text-red-600 animate-shake shadow-red-300"
                                                    }
                                        focus:scale-125 focus:ring-4 focus:ring-purple-400 focus:border-purple-500 focus:shadow-2xl`}
                                            />

                                        
                                            <div className="relative group/badge">
                                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur opacity-50 group-hover/badge:opacity-100 transition-opacity"></div>
                                                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center text-sm font-black text-white shadow-lg border-2 border-white transform group-hover/badge:rotate-12 transition-transform">
                                                    {answers[i][b]}
                                                </div>
                                            </div>

                                        </div>

                                    ))}
                                </div>

                            </div>

                        </div>
                    ))}

                </div>
  )
}

export default Board