"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { snippets } from "../data/snippets";

const difficultyMap = {
  easy: ["basics"],
  medium: ["functions", "recursion"],
  hard: ["async", "erc20"],
};

export default function CodeTest() {
  const [language, setLanguage] = useState("javascript");
  const [difficulty, setDifficulty] = useState("easy");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);

  const inputRef = useRef(null);

  // Load snippet
  useEffect(() => {
    const languageSnippets = snippets[language];
    if (!languageSnippets) return;

    const categories = difficultyMap[difficulty] || [];
    const pool = categories.flatMap(
      (cat) => languageSnippets[cat] || []
    );

    if (!pool.length) return;

    const randomSnippet =
      pool[Math.floor(Math.random() * pool.length)];

    setCode(randomSnippet.code);
    setInput("");
    setErrors(0);
    setFinished(false);
    setStartTime(null);

    inputRef.current?.focus();
  }, [language, difficulty]);

  const chars = useMemo(() => code.split(""), [code]);
  const index = input.length;

  const handleChange = (e) => {
    if (finished) return;

    const value = e.target.value;

    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
    }

    if (value.length > chars.length) return;

    if (value.length > input.length) {
      const typedChar = value[value.length - 1];
      const expectedChar = chars[value.length - 1];
      if (typedChar !== expectedChar) {
        setErrors((e) => e + 1);
      }
    }

    setInput(value);

    if (value.length === chars.length) {
      setFinished(true);
    }
  };

  const minutes =
    startTime ? (Date.now() - startTime) / 1000 / 60 : 0;

  const wpm =
    minutes > 0 ? Math.round((index / 5) / minutes) : 0;

  const accuracy =
    index > 0
      ? Math.round(((index - errors) / index) * 100)
      : 100;

  return (
    <div className="w-full max-w-4xl rounded-3xl shadow-xl p-8 font-sans bg-white text-gray-900 dark:bg-neutral-900 dark:text-gray-100">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-center mb-6">
        Code Speed Test
      </h1>

      {/* Controls */}
      <div className="flex flex-col items-center gap-3 mb-6">

        {/* Language */}
        <div className="flex gap-2 flex-wrap justify-center">
          {["javascript", "rust", "solidity"].map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                language === l
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <div className="flex gap-2 flex-wrap justify-center">
          {["easy", "medium", "hard"].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                difficulty === d
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Code */}
      <pre className="rounded-2xl p-4 font-mono text-sm mb-4 whitespace-pre-wrap leading-relaxed bg-gray-50 border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
        {chars.map((char, i) => {
          let cls = "text-gray-400 dark:text-gray-500";
          if (i < index) {
            cls =
              char === input[i]
                ? "text-green-600 dark:text-green-400"
                : "text-red-500 dark:text-red-400";
          }
          return (
            <span key={i} className={cls}>
              {char}
            </span>
          );
        })}
      </pre>

      {/* Input */}
      {!finished && (
        <input
          ref={inputRef}
          value={input}
          onChange={handleChange}
          placeholder="Type the code…"
          className="w-full px-4 py-3 rounded-2xl font-mono outline-none border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 dark:bg-neutral-900 dark:text-gray-100 dark:border-neutral-700"
        />
      )}

      {/* Stats */}
      <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600 dark:text-gray-400">
        <span>WPM: {wpm}</span>
        <span>Errors: {errors}</span>
        <span>Accuracy: {accuracy}%</span>
      </div>

      {/* Finished */}
      {finished && (
        <div className="mt-4 text-center font-medium text-green-600 dark:text-green-400">
          Test complete 🎉
        </div>
      )}
    </div>
  );
}
