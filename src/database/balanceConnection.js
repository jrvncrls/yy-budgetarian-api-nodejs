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

exports.updateBalanceByUser = async (userId) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    let newBalance = 0;

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

    let userAmountDetailsById = userAmountDetails.find((x) => x._id == userId);
    newBalance =
      totalExpense[0].totalExpense -
      (userAmountDetailsById.totalPaymentAmount +
        userAmountDetailsById.totalExpenseAmount);

    //update balance for all user
    await client
      .db(db)
      .collection(collection)
      .updateOne(
        { userId: userAmountDetails[0]._id },
        {
          $set: {
            amount:
              totalExpense[0].totalExpense -
              (userAmountDetails[0].totalPaymentAmount +
                userAmountDetails[0].totalExpenseAmount),
          },
        }
      );

    await client
      .db(db)
      .collection(collection)
      .updateOne(
        { userId: userAmountDetails[1]._id },
        {
          $set: {
            amount:
              totalExpense[0].totalExpense -
              (userAmountDetails[1].totalPaymentAmount +
                userAmountDetails[1].totalExpenseAmount),
          },
        }
      );

    return { newBalance };
  } catch (error) {
    return error;
  }
};
