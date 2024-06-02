import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import commentsRoutes from "./src/routes/comments.routes.js";
import productsRoutes from "./src/routes/products.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import imagesRoutes from "./src/routes/images.routes.js";
import { dbConection } from "./src/database/dbConection.js";
const app = express();

const appServer = async () => {
  dotenv.config();

  // DB Conection
  await dbConection();
  // Habilitar CORS
  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "*", // Permitir solo tu dominio de Vercel
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };
  app.use(cors(corsOptions));

  // Middleware para manejar solicitudes preflight (OPTIONS)
  app.options('*', cors(corsOptions));

  app.use(express.json());
  app.use("/public", express.static(`./temp/imgs`));
  app.use("/images", imagesRoutes);
  app.use("/api/products", productsRoutes);
  app.use("/api/comments", commentsRoutes);
  app.use("/api/cart", cartRoutes);

  app.listen(process.env.PORT, () =>
    console.log(colors.yellow(`Server Running in port: ${process.env.PORT}`))
  );
};

appServer();
