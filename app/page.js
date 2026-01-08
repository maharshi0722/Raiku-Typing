"use client";

import { useState } from "react";
import CodeTest from "../components/codeTest";

const HEADER_HEIGHT = "96px"; // must match header height

export default function Home() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setStep(2);
  };

  return (
    <main className="min-h-screen bg-[#f7f7fb] font-sans">

      {/* FIXED HEADER */}
      <div
        className="fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center bg-[#f7f7fb] border-b"
        style={{ height: HEADER_HEIGHT }}
      >
        <img
          src="/logo.jpeg"
          alt="Raiku logo"
          className="h-10 mb-1"
        />
        <h1 className="text-xl sm:text-2xl font-semibold text-indigo-700">
          Raiku Code Speed Test
        </h1>
      </div>

      {/* CONTENT AREA (TRUE CENTERING) */}
      <div
        className="flex items-center justify-center px-6"
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
          paddingTop: HEADER_HEIGHT,
        }}
      >
        {step === 1 && (
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
            <p className="text-gray-500 mb-6">
              Measure how fast and accurate you type real code
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                Start Test
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <CodeTest
            username={username}
            onBack={() => setStep(1)}
          />
        )}
      </div>
    </main>
  );
}
