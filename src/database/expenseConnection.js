const { MongoClient, ObjectId } = require("mongodb");

const uri =
  "mongodb+srv://jlcarlos:Mo5l5Pg6Sa0wi7vA@cluster0.eqbysaf.mongodb.net/?retryWrites=true&w=majority";
const db = "yy-budgetarian";
const collection = "expenses";

exports.addExpense = async (payload) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const result = await client
      .db(db)
      .collection(collection)
      .insertOne({
        amount: payload.amount,
        description: payload.description,
        username: payload.username,
        method: payload.method,
        createdDateTime: new Date(),
      });

    return result;
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};

exports.getAllExpenses = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const result = await client
      .db(db)
      .collection(collection)
      .aggregate([
        {
          $match: { amount: { $ne: 0 } },
        },
        {
          $lookup: {
            from: "users",
            localField: "username",
            foreignField: "username",
            as: "users",
          },
        },
        { $unwind: "$users" },
        {
          $project: {
            _id: 0,
            amount: 1,
            description: 1,
            method: 1,
            createdDateTime: 1,
            username: "$users.username",
          },
        },
      ])
      .toArray();

    return result;
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};
