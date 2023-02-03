import express from "express";
import ProductsModel from "../products/model.js";
import ReviewsModel from "./model.js";

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
    });
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.put("/:reviewId/categories", async (req, res, next) => {
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
reviewsRouter.delete(
  "/:reviewId/category/:productId",
  async (req, res, next) => {
    try {
      const numberOfDeletedRows = await ProductsModel.destroy({
        where: { id: req.params.productId },
      });
      if (numberOfDeletedRows === 1) {
        res.status(204).send();
      } else {
        next(
          createHttpError(
            404,
            `Product with id ${req.params.productId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default reviewsRouter;
