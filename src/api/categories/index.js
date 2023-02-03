import express from "express";
import CategoriesModel from "./model.js";
import ProductsModel from "../products/model.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/:productId/addCategory", async (req, res, next) => {
  try {
    const { categoryId } = await CategoriesModel.create(req.body);

    if (req.body.categories) {
      await CategoriesCategoriesModel.bulkCreate(
        req.body.categories.map((category) => {
          return {
            categoryId: category,
            reviewId,
          };
        })
      );
    }
    res.status(201).send({ id: reviewId });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
categoriesRouter.get("/:productId/categories", async (req, res, next) => {
  try {
    const categories = await CategoriesModel.findAll({
      include: [{ model: ProductsModel, attributes: ["name", "price"] }],
    });
    res.send(categories);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
categoriesRouter.get("/:productId/categories", async (req, res, next) => {
  try {
    const categories = await CategoriesModel.findAll({
      include: [{ model: ProductsModel, attributes: ["name", "price"] }],
    });
    res.send(categories);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
categoriesRouter.post("/:productId/bulk", async (req, res, next) => {
  try {
    const categories = await CategoriesModel.bulkCreate([
      { category: "Phone" },
      { category: "Pens" },
    ]);
    res.send(categories.map((category) => category.categoryId));
  } catch (err) {
    console.log(err);
    next(err);
  }
});
export default categoriesRouter;
