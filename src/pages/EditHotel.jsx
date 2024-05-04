import React from "react";
import EditHotelForm from "../components/form/EditHotelForm";
export default function EditHotel() {
  return (
    <main className="p-3">
      <section className="text-xl text-neutral-400 shadow-lg rounded p-3 w-full my-2">
        Edit Hotel
      </section>
      <EditHotelForm></EditHotelForm>
    </main>
  );
}
