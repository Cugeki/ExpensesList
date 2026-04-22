import { Router, Response, Request } from "express";
import pool from "../db";
import authenticate from "../middleware/authenticate";

const router = Router();

router.get("/", authenticate, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const result = await pool.query(
    "SELECT id, amount, title, TO_CHAR(date, 'YYYY-MM-DD') as date FROM expenses WHERE user_id = $1",
    [userId],
  );
  res.json(result.rows);
});

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { amount, title } = req.body;
  const date = new Date().toISOString().split("T")[0];
  const userId = (req as any).user.id;
  if (!amount || !title) {
    res.status(400).json({ error: "Amount and title are required" });
    return;
  }
  const result = await pool.query(
    "INSERT INTO expenses(amount,title,date,user_id) VALUES($1, $2, $3, $4) RETURNING *",
    [amount, title, date, userId],
  );
  res.status(201).json(result.rows[0]);
});

router.delete("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;
  await pool.query("DELETE FROM expenses WHERE id = $1 AND user_id = $2", [
    id,
    userId,
  ]);
  res.status(204).send();
});

export default router;
