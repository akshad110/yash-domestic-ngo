const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = require("./models/Admin");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const branchRoutes = require("./routes/branchRoutes");
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/yash-domestic";
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "divyar9979@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@123";
const FRONTEND_URL = process.env.FRONTEND_URL || "*";

/** Single URL, comma-separated list, or * (reflect request origin). */
function resolveCorsOrigin(raw) {
  if (!raw || raw === "*") return true;
  const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
  if (list.length === 0) return true;
  if (list.length === 1) return list[0];
  return list;
}

app.use(
  cors({
    origin: resolveCorsOrigin(FRONTEND_URL),
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);

async function ensureDefaultAdmin() {
  const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existingAdmin) return;

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await Admin.create({
    email: ADMIN_EMAIL,
    passwordHash,
  });
}

async function startServer() {
  try {
    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = JWT_SECRET;
    }

    await mongoose.connect(MONGO_URI);
    await ensureDefaultAdmin();

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`API running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
