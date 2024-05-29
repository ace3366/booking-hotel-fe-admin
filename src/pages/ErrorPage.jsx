import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <main className={` h-screen flex justify-center`}>
      {" "}
      <div className="text-center mt-44">
        {" "}
        <h2 className="text-6xl font-encode font-semibold text-red-500">
          Oops!
        </h2>
        <p className="text-2xl mt-10">Look like something went wrong</p>
        <h3 className="text-xl text-red-500 font-semibold mt-8">
          We're sorry for this inconvenience
        </h3>
        <Link
          to="/"
          className="mt-10 inline-block hover:text-blue-400 text-blue-700 text-xl"
        >
          <i className="fa-solid fa-circle-left"></i> Back to homepage
        </Link>
      </div>
    </main>
  );
}
