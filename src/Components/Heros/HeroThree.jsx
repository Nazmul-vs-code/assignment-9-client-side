import Link from "next/link";
import React from "react";

const HeroThree = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-28 flex flex-col lg:flex-row items-center gap-12">

        {/* Left Content */}
        <div className="flex-1">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Build The Next Big Idea 💡
          </h1>

          <p className="mt-6 text-gray-300">
            A space where creativity meets execution.
          </p>

          <div className="mt-8">
            <Link
              href="/ideas"
              className="btn btn-primary rounded-full px-8"
            >
              Explore Ideas
            </Link>
          </div>

        </div>

        {/* Right Card */}
        <div className="flex-1 flex justify-center">

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 w-80 md:w-96 shadow-xl">

            <h2 className="text-xl font-semibold">
              🚀 Idea Snapshot
            </h2>

            <p className="mt-4 text-gray-300 text-sm">
              AI-powered startup idea generator for future founders.
            </p>

            <div className="mt-6 flex justify-between text-sm">

              <span>Trend</span>
              <span className="text-green-400">Rising 🔥</span>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default HeroThree;