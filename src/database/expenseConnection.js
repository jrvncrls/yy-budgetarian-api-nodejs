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
        userId: new ObjectId(payload.userId),
        method: payload.method,
      });

    return result;
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};
