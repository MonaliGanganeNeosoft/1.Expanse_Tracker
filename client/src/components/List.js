import React from "react";
import { default as api } from "../store/apiSlice";

import "boxicons";
// const obj = [
//   {
//     name: "Savings",
//     color: "#f9c74f",
//   },
//   {
//     name: "Investment",
//     color: "#f9c74f",
//   },
//   {
//     name: "Expenses",
//     color: "rgb(54,162,235)",
//   },
// ];
export default function List() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  console.log(data);
  const [deleteTransaction] = api.useDeletetransactionMutation();

  let Transactions;
  const handleClick = (e) => {
    // console.log(e.target.dataset.id);
    if (!e.target.dataset.id) return 0;
    deleteTransaction({ _id: e.target.dataset.id });
  };
  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((v, i) => (
      <Transaction key={i} category={v} handler={handleClick}></Transaction>
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {/* {obj.map((v, i) => (
        <Transaction key={i} category={v}></Transaction>
      ))} */}

      {Transactions}
    </div>
  );
}

function Transaction({ category, handler }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button className="px-3" onClick={handler}>
        <box-icon
          data-id={category._id ?? ""}
          color={category.color ?? "#e5e5e5"}
          size="25px"
          name="trash"
        ></box-icon>
      </button>
      <span className="block w-full">
        {category.name ?? ""}
        <span style={{ textDecoration: "none", fontFamily: "sans-serif" }}>
          ({category.type})
        </span>
      </span>
      <p>{category.amount}</p>
    </div>
  );
}
