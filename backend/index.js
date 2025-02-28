import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/database.js";
import recipesRoutes from "./routes/recipesRoutes.js";
import spotifyRoutes from "./routes/spotifyRoutes.js";
import cocktailRoutes from "./routes/cocktailRoutes.js";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, 
  })
);

app.use("/api", recipesRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api", cocktailRoutes);

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
