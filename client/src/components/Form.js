import React from "react";
import { useForm } from "react-hook-form";
import List from "./List";
import { default as api } from "../store/apiSlice";

export default function Form() {
  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();
  const onSubmit = async (data) => {
    if (!data) return {};
    await addTransaction(data).unwrap();
    resetField("name");
    resetField("amount");
  };
  return (
    <div>
      <h1 className="font-bold pb-4 text-xl">Transation</h1>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input
              type="text"
              {...register("name")}
              placeholder="salary rent house"
              className="form-input"
            />
          </div>
          <select className="form-input" {...register("type")}>
            <option value="Investment" defaultValue>
              Investment
            </option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          <div className="input-group">
            <input
              type="text"
              {...register("amount")}
              placeholder="Amount"
              className="form-input"
            />
          </div>
          <div className="submit-btn">
            <button className="border py-2 text-white bg-indigo-500 w-full">
              Make Transctions
            </button>
          </div>
        </div>
      </form>
      <List />
    </div>
  );
}
