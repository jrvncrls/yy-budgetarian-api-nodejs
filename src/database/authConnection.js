const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://jlcarlos:Mo5l5Pg6Sa0wi7vA@cluster0.eqbysaf.mongodb.net/?retryWrites=true&w=majority";
const db = "yy-budgetarian";
const collection = "users";

exports.login = async (payload) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const result = await client
      .db(db)
      .collection(collection)
      .findOne({ username: payload.username, password: payload.password });

    return result;
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};
