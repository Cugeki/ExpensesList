import { Router, Response, Request } from "express";
import bcrypt from "bcrypt";
import pool from "../db";
import jwt from "jsonwebtoken";
import authenticate from "../middleware/authenticate";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashed],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "24h" },
  );
  res.json({ token });
});

router.get("/budget", authenticate, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const result = await pool.query("SELECT budget FROM users where id = $1", [
    userId,
  ]);
  res.json(result.rows[0]);
});

router.patch("/budget", authenticate, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { budget } = req.body;

  const result = await pool.query(
    "UPDATE users SET budget = $1 WHERE id = $2 RETURNING budget",
    [budget, userId],
  );
  res.json(result.rows[0]);
});
export default router;
