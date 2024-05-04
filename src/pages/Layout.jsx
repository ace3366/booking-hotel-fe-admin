import React from "react";

import { Outlet, Link } from "react-router-dom";

import NavBar from "../components/nav/NavBar";

export default function Layout() {
  return (
    <main className="grid grid-cols-7 py-3 px-8">
      <Link
        to="dashboard"
        className="col-span-1 text-center text-[#815eff] font-bold text-xl py-3 border-r-2 border-solid border-neutral-200 border-b-2 border-solid border-neutral-200"
      >
        Admin Page
      </Link>
      <div className="col-span-6 border-b-2 border-solid border-neutral-200"></div>
      <NavBar className="text-sm col-span-1 border-r-2 border-solid border-neutral-200"></NavBar>
      <div className="col-span-6">
        <Outlet></Outlet>
      </div>
    </main>
  );
}
