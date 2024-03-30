import express from "express";
const router = express.Router();

import {
  getProdcuts,
  getProductById,
} from "../controllers/productController.js";

router.route("/").get(getProdcuts);
router.route("/:id").get(getProductById);
export default router;
