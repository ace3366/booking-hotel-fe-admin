import React from "react";
import { useEffect } from "react";
import { dateConvert } from "../../util/dateConvert";
import { useFetchData } from "../../hooks/fetchData";
import classes from "./Table.module.css";

export default function DashBoardTable() {
  const {
    data: transactions,
    isLoading,
    err,
  } = useFetchData("recent-transactions");

  return (
    <section className="shadow-lg mt-2">
      <div className="py-10 px-8">
        <h2 className="text-2xl text-neutral-500 ">Latest Transactions</h2>
        {transactions && (
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
                  <div>User</div>{" "}
                </th>
                <th>
                  {" "}
                  <div>Hotel</div>{" "}
                </th>
                <th>
                  {" "}
                  <div>Room</div>{" "}
                </th>
                <th>
                  {" "}
                  <div>Date</div>{" "}
                </th>
                <th>
                  {" "}
                  <div>Price</div>{" "}
                </th>
                <th>
                  {" "}
                  <div>Payment Method</div>{" "}
                </th>
                <th>
                  <div>Status</div>{" "}
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{transaction._id}</td>
                  <td>{transaction.user.fullName}</td>
                  <td>{transaction.hotel.name}</td>
                  <td>{transaction.room.toString()}</td>
                  <td>
                    {dateConvert(transaction.dateStart)} <span> - </span>{" "}
                    {dateConvert(transaction.dateEnd)}
                  </td>
                  <td>${transaction.price}</td>
                  <td>{transaction.payment}</td>
                  <td>
                    <span
                      className={`${
                        transaction.status === "Booked"
                          ? "text-neutral-200  bg-[#FF5733]"
                          : transaction.status === "Checkin"
                          ? "text-neutral-200  bg-[#17AF47]"
                          : "text-neutral-700  bg-[##87C5D0]"
                      } rounded p-1`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* <div className="flex justify-end mt-5">
          <div>
            <span className="mr-4">
              {page} / {transactionPage.maxPage}
            </span>
            <i
              onClick={() => {
                page !== 1 && setPage((preState) => preState - 1);
              }}
              className="fa-solid fa-angle-left text-xl text-neutral-500 hover:text-neutral-800 cursor-pointer"
            ></i>
            <i
              onClick={() => {
                page !== transactionPage.maxPage &&
                  setPage((preState) => preState + 1);
              }}
              className="fa-solid fa-angle-right text-xl text-neutral-500 hover:text-neutral-800 cursor-pointer ml-5"
            ></i>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export async function loader() {
  const response = await fetch(
    `${process.env.REACT_APP_API}/recent-transactions`
  );
  if (!response.ok) {
    throw new Error(" Can not fetch data");
  }
  return response;
}
