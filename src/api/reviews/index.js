import express from "express";
import ProductsModel from "../products/model.js";
import ReviewsModel from "./model.js";
// import ReviewsCategoriesModel from "./reviewsCategoriesModel.js.js";
// import CategoriesModel from "../categories/model.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
    const { reviewId } = await ReviewsModel.create(req.body);

    if (req.body.categories) {
      await ReviewsCategoriesModel.bulkCreate(
        req.body.categories.map((category) => {
          return {
            categoryId: category,
            reviewId,
          };
        })
      );
    }
    res.status(201).send({ id: reviewId });
  } catch (error) {
    next(error);
  }
});
reviewsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    const reviews = await ReviewsModel.findAll({
      include: [{ model: ProductsModel, attributes: ["name", "price"] }],
      include: [
        // { model: ReviewsModel, attributes: ["review"] },
        // {
        //   model: CategoriesModel,
        //   attributes: ["name"],
        //   through: { attributes: [] },
        // },
        // to exclude from the result the junction table rows --> through: { attributes: [] }
      ],
    });
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.put("/:reviewId/category", async (req, res, next) => {
  try {
    const { id } = await ReviewsCategoriesModel.create({
      reviewId: req.params.reviewId,
      categoryId: req.body.categoryId,
    });
    res.status(201).send({ id });
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
