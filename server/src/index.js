import express from "express";
import path from "path";
import "dotenv/config";
import colors from "colors";
import morgan from "morgan";
import productsRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMidlleware.js";

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`.yellow.bold);
});
