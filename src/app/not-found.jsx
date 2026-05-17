import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="text-center max-w-md">

        <h1 className="text-8xl font-bold text-primary">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="mt-3 text-base-content/70">
          Oops! The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="btn btn-primary mt-6 rounded-full px-8"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;