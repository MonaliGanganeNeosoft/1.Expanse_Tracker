const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//categories=>field=>['type','color']
const catgories_model = new Schema({
  type: { type: String, default: "Investment" },
  color: { type: String, default: "#FCBE44" },
});
//transction=>field=>['name','type','amount','date']
const transaction_model = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String, defult: "Investment" },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

const Categories = mongoose.model("categories", catgories_model);
const Transactions = mongoose.model("transaction", transaction_model);

module.exports = {
  Categories,
  Transactions,
};
