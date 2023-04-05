import express from "express";
import auth from "./routes/auth.routes";
import connection from "./config/db";

const PORT = 5000;
const app = express();

connection();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/api/auth", auth);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
