import React from "react";
import { Form, useActionData, useLoaderData, redirect } from "react-router-dom";
import classes from "./NewForm.module.css";

export default function NewRoomForm() {
  const hotels = useLoaderData();
  const formCheck = useActionData();

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
              <input type="text" name="title" placeholder="2 bed room" />
            </div>

            <div>
              <label htmlFor="">Price </label>
              <p>
                {formCheck && formCheck.price !== "valid" && formCheck.price}
              </p>
              <input type="text" name="price" placeholder="100" />
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
              />
            </div>

            <div>
              <label htmlFor="">Max People</label>
              <p>
                {formCheck &&
                  formCheck.maxPeople !== "valid" &&
                  formCheck.maxPeople}
              </p>
              <input type="text" name="maxPeople" placeholder="2" />
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
          Send
        </button>
      </Form>
    </main>
  );
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
  const response = await fetch(`${process.env.REACT_APP_API}/new-room`, {
    method: "POST",
    body: JSON.stringify(room),
    headers: { "Content-Type": "application/json" },
  });
  const resData = await response.json();

  if (resData.message && resData.message === "New room has been created") {
    return redirect("/rooms");
  } else {
    return resData;
  }
}

export async function loader({ request, params }) {
  const response = await fetch(`${process.env.REACT_APP_API}/fetch-full-hotel`);
  if (!response.ok) {
    throw new Error("Can not fetch all the hotel");
  }
  return response;
}
