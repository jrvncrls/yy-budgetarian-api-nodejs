const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://jlcarlos:Mo5l5Pg6Sa0wi7vA@cluster0.eqbysaf.mongodb.net/?retryWrites=true&w=majority";
const db = "yy-budgetarian";

exports.getUserByUsername = async (username) => {
  const client = new MongoClient(uri);
  try {
    const result = await client
      .db(db)
      .collection("users")
      .findOne({ username: username });

    return result;
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};
