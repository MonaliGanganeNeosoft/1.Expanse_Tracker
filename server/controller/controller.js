const model = require("../models/model");

//get categories

// function create_Categories(req, res) {
//   res.json("Get req from category");
// }

//post://http://localhost:5000/api/categories
async function create_Categories(req, res) {
  const Create = new model.Categories({
    type: "Expense",
    color: "#FCBE44",
  });
  await Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` });
  });
}

//get://http://localhost:5000/api/categories

async function get_Catgories(req, res) {
  let data = await model.Categories.find({});
  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  //   return res.json(data);
  return res.json(filter);
}

//post://http://localhost:5000/api/transaction
async function create_Transaction(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  let { name, type, amount } = req.body;
  const create = await new model.Transactions({
    name,
    type,
    amount,
    date: new Date(),
  });
  create.save(function (err) {
    if (!err) return res.json(create);
    return res
      .status(400)
      .json({ message: `Error while creating Transaction ${err}` });
  });
}
//get://http://localhost:5000/api/transaction

async function get_Transaction(req, res) {
  let data = await model.Transactions.find({});
  return res.json(data);
}
//delete://http://localhost:5000/api/transaction

async function delete_Transaction(req, res) {
  if (!req.body) res.status(400).json({ message: "Request body not found" });
  await model.Transactions.deleteOne(req.body, function (err) {
    if (!err) res.json("Record Deleted..!");
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleteing transtion record");
    });
}

//get://http://localhost:5000/api/labels
async function get_Labels(req, res) {
  model.Transactions.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "Categories_info",
      },
    },
    {
      $unwind: "$Categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.Categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Loopup Collection Error");
    });
}

module.exports = {
  create_Categories,
  get_Catgories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
};
