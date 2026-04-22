import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import expenseRouter from "./routes/expenseRouter";

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
