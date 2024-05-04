import React from "react";
import { useLoaderData } from "react-router-dom";
import { dateConvert } from "../../util/dateConvert";
import DashBoardCard from "../../components/UI/DashBoardCard";
import DashBoardTable from "../../components/table/DashBoardTable";
import classes from "./Dashboard.module.css";

export default function () {
  const summary = useLoaderData();
  return (
    <main className={classes["dashboard-container"]}>
      <section className="flex flex-wrap justify-between">
        <DashBoardCard
          title="USERS"
          number={summary.userCount}
          iconStyles="fa-regular fa-user text-rose-700 bg-rose-200 "
        ></DashBoardCard>
        <DashBoardCard
          title="ORDERS"
          number={summary.orderCount}
          iconStyles="fa-solid fa-cart-shopping text-amber-700 bg-amber-200 "
        ></DashBoardCard>
        <DashBoardCard
          title="EARNINGS"
          number={`$ ${summary.earnings}`}
          iconStyles="fa-solid fa-sack-dollar text-lime-700 bg-lime-200 "
        ></DashBoardCard>
        <DashBoardCard
          title="BALANCE"
          number={`$ ${summary.balance}`}
          iconStyles="fa-solid fa-wallet text-purple-700 bg-purple-200 "
        ></DashBoardCard>
      </section>

      <DashBoardTable></DashBoardTable>
    </main>
  );
}
export async function loader() {
  const response = await fetch(
    `${process.env.REACT_APP_API}/transaction-summary`
  );
  return response;
}
