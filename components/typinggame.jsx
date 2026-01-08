"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { words } from "./words";

export default function TypingGame({ username, timeLimit, onBack }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [wpm, setWPM] = useState(0);
  const [errors, setErrors] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [wordStatus, setWordStatus] = useState([]);

  const inputRef = useRef(null);

  const wordList = useMemo(() => {
    const list = [];
    let prev = null;
    for (let i = 0; i < 200; i++) {
      let w;
      do {
        w = words[Math.floor(Math.random() * words.length)];
      } while (w === prev);
      list.push(w);
      prev = w;
    }
    return list;
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, finished]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value.endsWith(" ")) {
      const typed = value.trim();
      const correct = typed === wordList[currentWordIndex];

      setWordStatus((s) => [...s, correct]);
      setCurrentWordIndex((i) => i + 1);
      if (!correct) setErrors((e) => e + 1);
      setInput("");

      const correctWords =
        wordStatus.filter(Boolean).length + (correct ? 1 : 0);
      const minutes = (timeLimit - timeLeft) / 60;
      setWPM(minutes > 0 ? Math.round(correctWords / minutes) : 0);
    } else {
      setInput(value);
    }
  };

  const handleRetry = () => {
    setCurrentWordIndex(0);
    setInput("");
    setWPM(0);
    setErrors(0);
    setFinished(false);
    setTimeLeft(timeLimit);
    setWordStatus([]);
    inputRef.current?.focus();
  };

  const totalTyped = wordStatus.length + (input.trim() ? 1 : 0);
  const accuracy =
    totalTyped > 0
      ? Math.round(((totalTyped - errors) / totalTyped) * 100)
      : 100;

  const progress = (timeLeft / timeLimit) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgba(88,40,200,0.15)] p-6 sm:p-8 font-sans">

      <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-700 text-center mb-6">
        {username}'s Typing Challenge
      </h2>

      {/* Progress */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>{timeLeft}s</span>
        <span>{wpm} WPM</span>
        <span>{errors} errors</span>
        <span>{accuracy}%</span>
      </div>

      {!finished && (
        <>
          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="start typing"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-lg mb-4 font-mono tracking-wide"
          />

          {/* Words */}
          <div className="max-h-64 overflow-y-auto p-4 rounded-xl border border-gray-200 bg-gray-50 text-lg leading-relaxed font-mono">
            {wordList.map((word, wIdx) => (
              <span
                key={wIdx}
                className={`mr-2 ${
                  wIdx === currentWordIndex
                    ? "bg-indigo-100 rounded px-1"
                    : ""
                }`}
              >
                {word.split("").map((char, cIdx) => {
                  let cls = "text-gray-800";
                  if (wIdx < currentWordIndex) {
                    cls = wordStatus[wIdx]
                      ? "text-green-600"
                      : "text-red-500";
                  } else if (wIdx === currentWordIndex && cIdx < input.length) {
                    cls =
                      char === input[cIdx]
                        ? "text-green-600"
                        : "text-red-500";
                  }
                  return (
                    <span key={cIdx} className={cls}>
                      {char}
                    </span>
                  );
                })}{" "}
              </span>
            ))}
          </div>
        </>
      )}

      {finished && (
        <div className="text-center mt-6">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            Time’s up
          </h3>
          <p className="text-gray-600 mb-4">
            {wpm} WPM · {errors} errors · {accuracy}% accuracy
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="px-6 py-3 rounded-xl bg-green-500 text-white font-medium"
            >
              Retry
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium"
              >
                Home
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
