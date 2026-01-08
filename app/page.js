"use client";

import { useState } from "react";
import Image from "next/image";
import TypingGame from "../components/typinggame";

export default function Home() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [timer, setTimer] = useState(null);

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#F6F4FB] flex flex-col items-center justify-center px-4">
      
      {/* Title */}
<h1 className="text-4xl sm:text-5xl font-semibold text-indigo-700 mb-10 text-center font-sans">
  Raiku Typing Challenge
</h1>


      {/* STEP 1 */}
      {step === 1 && (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(88,40,200,0.15)] p-8 space-y-6">

          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Enter your username
          </h2>

          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              type="submit"
              see
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition"
            >
              Continue
            </button>
          </form>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(88,40,200,0.15)] p-8 flex flex-col items-center gap-6">

          {/* Logo */}
          <div className="bg-black rounded-2xl px-6 py-4 shadow-lg">
            <Image
              src="/logo.jpeg"
              alt="Raiku logo"
              width={160}
              height={60}
              priority
            />
          </div>

          {/* Username */}
          <h2 className="text-xl font-semibold text-gray-900">
            {username}
          </h2>

          <p className="text-gray-600">
            Choose timer
          </p>

          {/* Timer Buttons */}
          <div className="flex gap-3 flex-wrap justify-center">
            {[15, 30, 45, 60].map((t) => (
              <button
                key={t}
                onClick={() => setTimer(t)}
                className={`px-5 py-2 rounded-xl font-semibold transition ${
                  timer === t
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t}s
              </button>
            ))}
          </div>

          {/* Start */}
          <button
            onClick={() => setStep(3)}
            disabled={!timer}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition disabled:opacity-40"
          >
            Start
          </button>

          {/* Back */}
          <button
            onClick={() => setStep(1)}
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Back
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <TypingGame
          username={username}
          timeLimit={timer}
          onBack={() => setStep(1)}
        />
      )}
    </div>
  );
}
