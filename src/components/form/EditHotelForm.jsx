import React from "react";
import { useState } from "react";
import { Form, useActionData, useLoaderData, redirect } from "react-router-dom";
import classes from "./NewForm.module.css";

export default function EditHotelForm() {
  const formCheck = useActionData();
  const hotelData = useLoaderData();
  const [presetInput, setPresetInput] = useState({
    ...hotelData,
    rooms: hotelData.rooms
      .map((room) => room.title)
      .toString()
      .replace(/,/g, "\n"),
    photos: hotelData.photos.toString().replace(/,/g, "\n"),
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
              <label htmlFor="">Name</label>{" "}
              <p>{formCheck && formCheck.name !== "valid" && formCheck.name}</p>
              <input
                type="text"
                name="name"
                placeholder="My Hotel"
                value={presetInput.name}
                onChange={(e) => {
                  changeInput(e, "name");
                }}
              />
            </div>

            <div>
              <label htmlFor="">City </label>
              <p>{formCheck && formCheck.city !== "valid" && formCheck.city}</p>
              <input
                type="text"
                name="city"
                placeholder="New York"
                value={presetInput.city}
                onChange={(e) => {
                  changeInput(e, "city");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Distance from City Center</label>
              <p>
                {formCheck &&
                  formCheck.distance !== "valid" &&
                  formCheck.distance}
              </p>
              <input
                type="text"
                name="distance"
                placeholder="500"
                value={presetInput.distance}
                onChange={(e) => {
                  changeInput(e, "distance");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Description</label>
              <p>{formCheck && formCheck.desc !== "valid" && formCheck.desc}</p>
              <input
                type="text"
                name="desc"
                placeholder="description"
                value={presetInput.desc}
                onChange={(e) => {
                  changeInput(e, "desc");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Images</label>
              <p>
                {formCheck && formCheck.images !== "valid" && formCheck.images}
              </p>
              <textarea
                name="images"
                rows="5"
                placeholder="Break the line between images link"
                className="block border-x border-y border-solid border-neutral-500 w-full"
                // Convert from array to string, separate by ','
                value={presetInput.photos}
                onChange={(e) => {
                  changeInput(e, "desc");
                }}
              ></textarea>
            </div>
          </div>
          <div className="basis-2/12"></div>
          {/* Right side */}
          <div className={`flex flex-col basis-5/12 ${classes["upper-form"]}`}>
            <div>
              <label htmlFor="">Type</label>
              <p>{formCheck && formCheck.type !== "valid" && formCheck.type}</p>
              <input
                type="text"
                name="type"
                placeholder="hotel"
                value={presetInput.type}
                onChange={(e) => {
                  changeInput(e, "type");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Address</label>
              <p>
                {formCheck &&
                  formCheck.address !== "valid" &&
                  formCheck.address}
              </p>
              <input
                type="text"
                name="address"
                placeholder="elton st. 216"
                value={presetInput.address}
                onChange={(e) => {
                  changeInput(e, "address");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Title</label>
              <p>
                {formCheck && formCheck.title !== "valid" && formCheck.title}
              </p>
              <input
                type="text"
                name="title"
                placeholder="The best Hotel"
                value={presetInput.title}
                onChange={(e) => {
                  changeInput(e, "title");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Price</label>
              <p>
                {formCheck && formCheck.price !== "valid" && formCheck.price}
              </p>
              <input
                type="text"
                name="price"
                placeholder="100"
                value={presetInput.cheapestPrice}
                onChange={(e) => {
                  changeInput(e, "cheapestPrice");
                }}
              />
            </div>

            <div>
              <label htmlFor="">Featured</label>
              <p>
                {formCheck &&
                  formCheck.featured !== "valid" &&
                  formCheck.featured}
              </p>
              <select
                name="featured"
                className="block"
                value={presetInput.featured}
                onChange={(e) => {
                  changeInput(e, "featured");
                }}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div></div>
        </section>
        <section className="mt-6">
          <label htmlFor="">Rooms</label>
          <p>{formCheck && formCheck.rooms !== "valid" && formCheck.rooms}</p>
          <textarea
            name="rooms"
            placeholder="Break the line between room title"
            className="block border-x border-y border-solid border-neutral-500 w-full"
            rows="5"
            value={presetInput.rooms}
            onChange={(e) => {
              changeInput(e, "rooms");
            }}
          ></textarea>
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
    `${process.env.REACT_APP_API}/edit-hotel/${params.hotelId}`
  );
  if (!response.ok) {
    throw new Error("Can not fetch data");
  }
  return response;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const hotel = {
    name: data.get("name"),
    city: data.get("city"),
    distance: data.get("distance"),
    desc: data.get("desc"),
    type: data.get("type"),
    address: data.get("address"),
    title: data.get("title"),
    price: data.get("price"),
    featured: data.get("featured"),
    images: data.get("images"),
    rooms: data.get("rooms"),
  };
  const response = await fetch(
    `${process.env.REACT_APP_API}/edit-hotel/${params.hotelId}`,
    {
      method: "POST",
      body: JSON.stringify(hotel),
      headers: { "Content-Type": "application/json" },
    }
  );
  const resData = await response.json();

  if (resData.message && resData.message === "Hotel has been edited") {
    return redirect("/hotels");
  } else {
    return resData;
  }
}
