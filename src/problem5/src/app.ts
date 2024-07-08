import * as express from "express";
import "reflect-metadata";
import { AppDataSource } from "./ormconfig";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use("/api", routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export default app;
