/* ============================== */
/* IMPORTS                        */
/* ============================== */

import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "node:path";
import { fileURLToPath } from "url";

/* Routers API */

import authRouter from "./routers/api/authRouter.js";
import bookRouter from "./routers/api/bookRouter.js";
import libraryRouter from "./routers/api/libraryRouter.js";

/* Routers */

import favoriteRouter from "./routers/favoriteRouter.js";
import genreRouter from "./routers/genreRouter.js";
import writerRouter from "./routers/writerRouter.js";
import userRouter from "./routers/userRouter.js";

/* Pages */

import pageRouter from "./routers/pageRouter.js";




/* ============================== */
/* PATH CONFIG                    */
/* ============================== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/* ============================== */
/* APP INITIALIZATION             */
/* ============================== */

const app = express();


/* ============================== */
/* VIEW ENGINE (EJS)              */
/* ============================== */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "layouts/main");


/* ============================== */
/* STATIC FILES                   */
/* ============================== */

app.use(express.static(path.join(__dirname, "../public")));


/* ============================== */
/* MIDDLEWARES                    */
/* ============================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "lectio-secret",
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.error = null;
    next();
});


/* ============================== */
/* PAGE ROUTES                    */
/* ============================== */

app.use("/", pageRouter);


/* ============================== */
/* API ROUTES                     */
/* ============================== */

app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);
app.use("/api/library", libraryRouter);

app.use("/api/favorites", favoriteRouter);
app.use("/api/genres", genreRouter);
app.use("/api/authors", writerRouter);
app.use("/api/users", userRouter);


/* ============================== */
/* 404 HANDLER                    */
/* ============================== */

app.use((req, res) => {
  res.status(404).render("pages/404", {
    title: "Page introuvable"
  });
});


/* ============================== */
/* EXPORT                         */
/* ============================== */

export default app;