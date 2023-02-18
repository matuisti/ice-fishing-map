import express from "express";
import { router } from "./routes/router";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1.0", router);

app.listen(port, () => {
  console.log(`Server running port: ${port}`);
});
