import express from "express";
import cookieParser from "cookie-parser";

const app = express();

/* user gonna send data in differint format || for that 
we use this middlewares (limit) extended ==> object ke andar object etc
*/

//  when deta came through form
app.use(express.json({ limit: "16kb" }));

// when data in came through url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// this for when we want to store files like img, pdf , fevicon ==>> store in (public) folder
app.use(express.static("public"));

app.use(cookieParser());

// import routes
import healthCheckRouter from "./routes/healthCheck.routes.js";
import authRouter from "./routes/auth.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users", authRouter);

export default app;
