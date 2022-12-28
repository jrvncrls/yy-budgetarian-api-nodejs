const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://jlcarlos:Mo5l5Pg6Sa0wi7vA@cluster0.eqbysaf.mongodb.net/?retryWrites=true&w=majority";
const db = "yy-budgetarian";
const collection = "balance";

exports.getBalanceByUser = async (userId) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const result = await client
      .db(db)
      .collection(collection)
      .findOne({ userId: new ObjectId(userId) });

    return result;
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};

exports.updateBalanceByUser = async (userDetails, totalExpense) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    //update balance for all user
    const result = await client
      .db(db)
      .collection(collection)
      .updateOne(
        { userId: userDetails._id },
        {
          $set: {
            amount:
              totalExpense -
              (userDetails.totalPaymentAmount + userDetails.totalExpenseAmount),
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
            localField: "_id",
            foreignField: "userId",
            as: "expenses",
          },
        },
        {
          $lookup: {
            from: "payments",
            localField: "_id",
            foreignField: "userId",
            as: "payments",
          },
        },
        {
          $project: {
            username: 1,
            totalPaymentAmount: { $sum: "$payments.amount" },
            totalExpenseAmount: { $divide: [{ $sum: "$expenses.amount" }, 2] },
          },
        },
      ])
      .toArray();

    return { userAmountDetails, totalExpense: totalExpense[0].totalExpense };
  } catch (error) {
    return error;
  }
};
