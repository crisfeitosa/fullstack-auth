import { Router } from "express";
import { ProductsController } from "@/controllers/products-controller";

import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { verifyUserAuthorization } from "@/middlewares/verifiyUserAuthorization";

const productsRoutes = Router();
const productsController = new ProductsController();

// Aplicar autorização em todas as rotas
// productsRoutes.use(verifyUserAuthorization(["sale"]));

productsRoutes.get("/", productsController.index);

// Autorizar apenas a rota de criação
productsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  productsController.create
);

export { productsRoutes }
