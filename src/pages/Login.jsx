import React from "react";
import { Form, useActionData, redirect } from "react-router-dom";
import { setData } from "../util/localStorage";

export default function Login() {
  const announce = useActionData();
  return (
    <main className="w-1/4 mx-auto mt-40 rounded shadow-lg  ">
      <h2 className="text-[#815eff] py-5 text-center text-3xl font-bold">
        Login Admin Page
      </h2>
      <Form method="post" className="pb-10">
        <div className="w-3/5 mx-auto">
          {announce && <p className="text-red-500">{announce.announce}</p>}
          <input
            className="block w-full my-6 p-2 border-x border-y border-neutral-500 border-solid rounded"
            type="text"
            placeholder="username"
            value="admin"
            name="username"
          />
          <input
            className="block w-full p-2 border-x border-y border-neutral-500 border-solid rounded"
            type="password"
            placeholder="password"
            value="admin"
            name="password"
          />
          <div className="text-center mt-12">
            {" "}
            <button className="bg-[#815eff] py-2 px-6 rounded ">Login</button>
          </div>
        </div>
      </Form>
    </main>
  );
}

export async function action({ request, params }) {
  try {
    const data = await request.formData();
    const admin = {
      username: data.get("username"),
      password: data.get("password"),
      isAdmin: true,
    };
    const response = await fetch(`${process.env.REACT_APP_API}/admin-login`, {
      method: "POST",
      body: JSON.stringify(admin),
      headers: { "Content-Type": "application/json" },
    });

    const resData = await response.json();

    if (resData.username) {
      setData("admin", resData);
      return redirect("/dashboard");
    } else {
      return resData;
    }
  } catch (err) {
    return {
      announce:
        "Something went wrong with the server now, it may take some time",
    };
  }
}
