import Link from "next/link";
import React from "react";

const HeroTwo = () => {
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg)",
      }}
    >

      <div className="bg-black/60">

        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col-reverse lg:flex-row items-center gap-12 text-white">

          {/* Left */}
          <div className="flex-1">

            <div className="badge badge-primary mb-4">
              IdeaVault Platform
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              Turn Ideas Into Startups 🚀
            </h1>

            <p className="mt-6 text-gray-200">
              Share ideas, get feedback, and build something real with the community.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">

              <Link
                href="/ideas"
                className="btn btn-primary rounded-full px-8"
              >
                Explore Ideas
              </Link>

              <Link
                href="/add-idea"
                className="btn btn-outline btn-primary rounded-full px-8"
              >
                Share Idea
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroTwo;