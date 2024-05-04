import React from "react";
import { useState } from "react";
import { Form, useActionData, useLoaderData, redirect } from "react-router-dom";
import classes from "./NewForm.module.css";
import { useFetchData } from "../../hooks/fetchData";

export default function EditRoomForm() {
  const { data: hotels, isLoading, err } = useFetchData("fetch-full-hotel");
  const RoomData = useLoaderData();
  const formCheck = useActionData();
  const [presetInput, setPresetInput] = useState({
    ...RoomData,
    roomNumbers: RoomData.roomNumbers.toString(),
  });

  // Change input using useState
  const changeInput = (e, inputType) => {
    setPresetInput((prevState) => {
      return { ...prevState, [inputType]: e.target.value };
    });
  };

  return (
    <main className="shadow-lg rounded w-full">
      <Form method="post" className={`${classes.form} py-3 px-10`}>
        <section className="flex justify-between">
          {/* Left side */}
          <div className={`flex flex-col basis-5/12 ${classes["upper-form"]}`}>
            <div>
              <label htmlFor="">Title</label>{" "}
              <p>
                {formCheck && formCheck.title !== "valid" && formCheck.title}
              </p>
              <input
                type="text"
                name="title"
                placeholder="2 bed room"
                value={presetInput.title}
                onChange={(e) => {
                  changeInput(e, "title");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Price </label>
              <p>
                {formCheck && formCheck.price !== "valid" && formCheck.price}
              </p>
              <input
                type="text"
                name="price"
                placeholder="100"
                value={presetInput.price}
                onChange={(e) => {
                  changeInput(e, "price");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Rooms</label>
              <p>
                {formCheck &&
                  formCheck.roomNumbers !== "valid" &&
                  formCheck.roomNumbers}
              </p>
              <textarea
                name="roomNumbers"
                rows="5"
                placeholder="Give comma between room numbers"
                value={presetInput.roomNumbers}
                onChange={(e) => {
                  changeInput(e, "roomNumbers");
                }}
                className="block border-x border-y border-solid border-neutral-500 w-full"
              ></textarea>
            </div>
          </div>
          <div className="basis-2/12"></div>
          {/* Right side */}
          <div className={`flex flex-col basis-5/12 ${classes["upper-form"]}`}>
            <div>
              <label htmlFor="">Description</label>
              <p>{formCheck && formCheck.desc !== "valid" && formCheck.desc}</p>
              <input
                type="text"
                name="desc"
                placeholder="King size bed, 1 bathroom"
                value={presetInput.desc}
                onChange={(e) => {
                  changeInput(e, "desc");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Max People</label>
              <p>
                {formCheck &&
                  formCheck.maxPeople !== "valid" &&
                  formCheck.maxPeople}
              </p>
              <input
                type="text"
                name="maxPeople"
                placeholder="2"
                value={presetInput.maxPeople}
                onChange={(e) => {
                  changeInput(e, "maxPeople");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Choose a hotel</label>
              <p>
                {formCheck &&
                  formCheck.featured !== "valid" &&
                  formCheck.featured}
              </p>
              <select name="hotel" className="block">
                {hotels.map((hotel) => (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div></div>
        </section>

        <button className="bg-teal-600 text-neutral-200 py-2 px-10 mt-6">
          Save
        </button>
      </Form>
    </main>
  );
}

export async function loader({ request, params }) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/edit-room/${params.roomId}`
  );
  if (!response.ok) {
    throw new Error("Can not fetch data");
  }
  return response;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const room = {
    desc: data.get("desc"),
    title: data.get("title"),
    price: data.get("price"),
    roomNumbers: data.get("roomNumbers"),
    maxPeople: data.get("maxPeople"),
    hotel: data.get("hotel"),
  };
  const response = await fetch(
    `${process.env.REACT_APP_API}/edit-room/${params.roomId}`,
    {
      method: "POST",
      body: JSON.stringify(room),
      headers: { "Content-Type": "application/json" },
    }
  );
  const resData = await response.json();

  if (resData.message && resData.message === "Room has been edited") {
    return redirect("/rooms");
  } else {
    return resData;
  }
}
