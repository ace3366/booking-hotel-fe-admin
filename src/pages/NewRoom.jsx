import React from "react";
import NewRoomForm from "../components/form/NewRoomForm";
export default function NewRoom() {
  return (
    <main className="p-3">
      <section className="text-xl text-neutral-400 shadow-lg rounded p-3 w-full my-2">
        Add New Product
      </section>
      <NewRoomForm></NewRoomForm>
    </main>
  );
}
