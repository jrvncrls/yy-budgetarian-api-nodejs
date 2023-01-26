const { MongoClient } = require("mongodb");
const _ = require("lodash");

const uri =
  "mongodb+srv://jlcarlos:Mo5l5Pg6Sa0wi7vA@cluster0.eqbysaf.mongodb.net/?retryWrites=true&w=majority";
const db = "yy-budgetarian";
const collection = "balance";

exports.getBalanceByUser = async (username) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const result = await client
      .db(db)
      .collection(collection)
      .findOne({ username: username });

    return result;
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};

exports.updateBalanceByUser = async (newBalance, username) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    //update balance for all user
    const result = await client
      .db(db)
      .collection(collection)
      .updateOne(
        { username: username },
        {
          $set: {
            amount: newBalance,
          },
        }
      );

    return result;
  } catch (error) {
    return error;
  }
};

exports.calculateBalancePerUser = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    // Total split expense
    let totalExpense = await client
      .db(db)
      .collection("expenses")
      .aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $project: {
            username: 1,
            totalExpense: { $divide: ["$totalAmount", 2] },
          },
        },
      ])
      .toArray();

    // Expense and Payments per User
    let userAmountDetails = await client
      .db(db)
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "expenses",
            localField: "username",
            foreignField: "username",
            as: "expenses",
          },
        },
        {
          $lookup: {
            from: "payments",
            localField: "username",
            foreignField: "username",
            as: "payments",
          },
        },
        {
          $project: {
            username: 1,
            newBalance: {
              $round: [
                {
                  $subtract: [
                    totalExpense[0].totalExpense,
                    {
                      $add: [
                        { $sum: "$payments.amount" },
                        { $divide: [{ $sum: "$expenses.amount" }, 2] },
                      ],
                    },
                  ],
                },
                2,
              ],
            },
          },
        },
      ])
      .toArray();

    return { userAmountDetails, totalExpense: totalExpense[0].totalExpense };
  } catch (error) {
    return error;
  }
};
