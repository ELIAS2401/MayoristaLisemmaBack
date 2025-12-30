import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { AppRoutes } from "./routes/routes.ts";

const app = express();
app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(AppRoutes.routes);

// Ruta inicial de prueba
app.get("/", (req, res) => {
  res.json({ message: "API Lissema funcionando" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
