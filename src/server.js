import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "#routes/index.js";
import { syncDatabase } from "#config/syncModels.js"; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

syncDatabase();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
