import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";     
dotenv.config();     

const app = express();

app.use(helmet()); 
app.use(hpp());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 200, // máximo 200 requests por IP
  message: "Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.",
});
app.use(limiter);


app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
