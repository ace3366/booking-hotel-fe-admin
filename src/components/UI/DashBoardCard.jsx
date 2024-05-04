import React from "react";

export default function DashBoardCard({ title, number, iconStyles }) {
  return (
    <div className="flex justify-between shadow-lg rounded p-3 w-64 h-24 my-2">
      {/* Info section */}
      <div>
        <h3 className="text-neutral-400 text-xs font-semibold">{title}</h3>
        <div className="text-xl mt-3">{number}</div>
      </div>
      {/* Icon section */}
      <div className="flex flex-col justify-end">
        <i className={`${iconStyles} p-2 rounded text-xs`}></i>
      </div>
    </div>
  );
}
