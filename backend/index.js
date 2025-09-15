const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
const allowedOrigins = [
  process.env.FRONTEND_URL_VERCEL,
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(cookieParser());

const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");

app.use("/", userRoutes);
app.use("/", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
