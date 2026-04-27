import { Router, Response, Request } from "express";
import pool from "../db";
import authenticate from "../middleware/authenticate";

const router = Router();

router.get("/", authenticate, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const result = await pool.query(
    "SELECT id, amount, title, category, paid, TO_CHAR(date, 'YYYY-MM-DD') as date FROM expenses WHERE user_id = $1",
    [userId],
  );
  res.json(result.rows);
});

router.post("/", authenticate, async (req: Request, res: Response) => {
  const { amount, title, category } = req.body;
  const date = new Date().toISOString().split("T")[0];
  const userId = (req as any).user.id;
  if (!amount || !title || !category) {
    res.status(400).json({ error: "Amount, title, and category are required" });
    return;
  }
  const result = await pool.query(
    "INSERT INTO expenses(amount,title,date,user_id,category) VALUES($1, $2, $3, $4, $5) RETURNING id, amount, title, category, paid, TO_CHAR(date, 'YYYY-MM-DD') as date",
    [amount, title, date, userId, category],
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

router.patch("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;
  const { amount, title, category } = req.body;

  const result = await pool.query(
    "UPDATE expenses SET title = $1, amount = $2, category = $3 WHERE id = $4 AND user_id = $5 RETURNING id, amount, title, category, TO_CHAR(date, 'YYYY-MM-DD') as date",
    [title, amount, category, id, userId],
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }

  res.json(result.rows[0]);
});
router.patch("/:id/paid", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  const result = await pool.query(
    "UPDATE expenses SET paid = NOT paid WHERE id = $1 AND user_id = $2 RETURNING id, amount, title, category, paid, TO_CHAR(date, 'YYYY-MM-DD') as date",
    [id, userId],
  );
  if (result.rows.length === 0) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }

  res.json(result.rows[0]);
});

export default router;
