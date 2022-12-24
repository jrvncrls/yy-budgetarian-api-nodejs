const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const userRoute = require("./routes/userRoute");
app.use("/api/users", userRoute);

const expenseRoute = require("./routes/expenseRoute");
app.use("/api/expense", expenseRoute);

const balanceRoute = require("./routes/balanceRoute");
app.use("/api/balance", balanceRoute);

const paymentRoute = require("./routes/paymentRoute");
app.use("/api/payment", paymentRoute);

const authRoute = require("./routes/authRoute");
app.use("/api/auth", authRoute);

const port = 3001;

app.listen(port, () => {
  console.log("Listening on app");
});
