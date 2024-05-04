import React from "react";
import { useLoaderData } from "react-router-dom";
import classes from "./Table.module.css";

export default function UserTable() {
  const users = useLoaderData();
  console.log(users);
  return (
    <>
      <section className="shadow-lg mt-2">
        <div className="py-10 px-8">
          <div className="flex justify-between">
            {" "}
            <h2 className="text-2xl text-neutral-500 ">Users List</h2>
          </div>
          {users && (
            <table className={classes.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>
                    {" "}
                    <div>ID</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Full Name</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Email</div>{" "}
                  </th>
                  <th>
                    {" "}
                    <div>Phone Number</div>{" "}
                  </th>
                </tr>
              </thead>

              <tbody>
                {" "}
                {users.map((user) => (
                  <tr key={user._id}>
                    <td></td>
                    <td>{user._id}</td>
                    <td>{user.fullName}</td>

                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}

export async function loader() {
  const response = await fetch(`${process.env.REACT_APP_API}/fetch-users`);
  if (!response.ok) {
    throw new Error("Can not fetch users");
  }
  return response;
}
