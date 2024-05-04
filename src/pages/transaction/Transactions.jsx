import React from "react";
import { useLoaderData } from "react-router-dom";
import { dateConvert } from "../../util/dateConvert";
import TransactionTable from "../../components/table/TransactionTable";
import classes from "./Transactions.module.css";

export default function Transactions() {
  return (
    <main className={classes["dashboard-container"]}>
      <TransactionTable></TransactionTable>
    </main>
  );
}

export async function loader() {
  const response = await fetch(
    `${process.env.REACT_APP_API}/transaction-summary`
  );
  return response;
}
