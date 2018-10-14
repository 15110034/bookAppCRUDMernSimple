import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { ConnectDatabase } from "./Databases/Connect";
import bookRoutes from "./routers/bookRouters";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
ConnectDatabase();

const port = process.env.PORT || 5000;
app.use("/api/books", bookRoutes);

app.use(express.static(path.resolve(__dirname, "../client", "build")));

app.get("/*", function(req, res) {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
