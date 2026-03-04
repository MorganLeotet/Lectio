/* ==== IMPORT ==== */

import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";

import bookRouter from "./routers/bookRouter.js";
import authRouter from "./routers/authRouter.js";
import libraryRouter from "./routers/libraryRouter.js";
import favoriteRouter from "./routers/favoriteRouter.js";
import genreRouter from "./routers/genreRouter.js";
import writerRouter from "./routers/writerRouter.js";
import userRouter from "./routers/userRouter.js";

/* ==== PATH CONFIG ==== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ==== APP INITIALIZATION ==== */

const app = express();

/* ==== EJS CONFIGURATION ==== */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* ==== STATIC FILES ==== */

app.use(express.static(path.join(__dirname, "../public")));

/* ==== MIDDLEWARES ==== */

app.use(express.json());

/* ============================= */
/* ROUTES                        */
/* ============================= */

/* Home */
app.get("/home", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public/pages/home.html"));
});

/* AUTH */
app.use("/auth", authRouter);

/* BOOKS */
app.use("/books", bookRouter);

/* LIBRARY */
app.use("/library", libraryRouter);

/* FAVORITES */
app.use("/favorites", favoriteRouter);

/* GENRES */
app.use("/genres", genreRouter);

/* AUTHORS */
app.use("/authors", writerRouter);

/* USERS */
app.use("/users", userRouter);

/* ==== EXPORT ==== */

export default app;