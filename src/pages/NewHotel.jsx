import React from "react";
import NewHotelForm from "../components/form/NewHotelForm";
export default function NewHotel() {
  return (
    <main className="p-3">
      <section className="text-xl text-neutral-400 shadow-lg rounded p-3 w-full my-2">
        Add New Product
      </section>
      <NewHotelForm></NewHotelForm>
    </main>
  );
}
