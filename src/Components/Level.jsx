import React from 'react'

const Level = ({level}) => {
  return (
    <div className="flex justify-center mb-10">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-12 py-5 rounded-full shadow-2xl border-4 border-white transform hover:scale-110 transition-all duration-300">
                            <span className="text-3xl font-black text-white drop-shadow-lg flex items-center gap-3">
                                <span className="animate-bounce">🎯</span>
                                LEVEL {level + 1}
                                <span className="animate-bounce delay-150">🎯</span>
                            </span>
                        </div>
                    </div>
                </div>
  )
}

export default Level