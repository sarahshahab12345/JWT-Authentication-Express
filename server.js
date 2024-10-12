import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5001;

import productRouter from "./routes/product-route.js";
import userRouter from "./routes/user-route.js";
import connectToDb from "./config/db-config.js";
import errorHandler from "./middlewares/error-handler.js";
import validateTokenHandler from "./middlewares/validate-token-handler.js";
import { getCurrentUser } from "./controllers/user-controller.js";
connectToDb();

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use(validateTokenHandler);

app.route("/api/users/current").get(getCurrentUser);

app.use("/api/products", productRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});
