const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use(cookieParser());

const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");

app.use("/", userRoutes);
app.use("/", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
