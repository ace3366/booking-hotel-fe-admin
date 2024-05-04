import React from "react";
import EditRoomForm from "../components/form/EditRoomForm";
export default function EditRoom() {
  return (
    <main className="p-3">
      <section className="text-xl text-neutral-400 shadow-lg rounded p-3 w-full my-2">
        Edit Room
      </section>
      <EditRoomForm></EditRoomForm>
    </main>
  );
}
