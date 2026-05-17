import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-base-200">

      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Left Content */}
        <div className="flex-1">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Share & Discover <span className="text-primary">Startup Ideas</span> 🚀
          </h1>

          <p className="mt-6 text-base-content/70 text-lg leading-relaxed">
            IdeaVault is a community-driven platform where innovators,
            founders, and creators share startup ideas, validate concepts,
            and collaborate to build the next big thing.
          </p>

          <p className="mt-4 text-base-content/60">
            Explore trending ideas, give feedback, and help shape the future of innovation.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href="/ideas"
              className="btn btn-primary rounded-full px-8"
            >
              Explore Ideas
            </Link>
          </div>

        </div>

        {/* Right Visual */}
        <div className="flex-1 flex justify-center">

          <div className="relative">

            <div className="w-72 h-72 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl absolute"></div>

            <div className="relative bg-base-100 shadow-xl rounded-2xl p-8 w-72 md:w-96 text-center">

              <h2 className="text-xl font-bold">
                💡 Trending Idea
              </h2>

              <p className="mt-4 text-base-content/70">
                AI-powered platform that helps students generate startup ideas based on skills and trends.
              </p>

              <div className="mt-6 text-sm text-primary font-semibold">
                #AI #Startup #Innovation
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Hero;