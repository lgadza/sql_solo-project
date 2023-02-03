import express from "express";
import createHttpError from "http-errors";
import { Op } from "sequelize";
import ReviewsModel from "../reviews/model.js";
import ProductsModel from "./model.js";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const { id } = await ProductsModel.create(req.body);
    res.status(201).send({ id });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const query = {};
    const minPrice = req.params.minPrice;
    const maxPrice = req.params.maxPrice;
    if (req.query.name) query.name = { [Op.iLike]: `%${req.query.name}%` };
    else if (req.query.category)
      query.category = { [Op.iLike]: `${req.query.category}%` };
    else if (req.query.price)
      query.price = { [Op.between]: [minPrice, maxPrice] };

    const products = await ProductsModel.findAll({
      where: { ...query },
      attributes: ["name", "category", "price", "image", "description", "id"],
    });
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await ProductsModel.findByPk(req.params.productId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (product) {
      res.send(product);
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
});

productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await ProductsModel.update(
      req.body,
      {
        where: { id: req.params.productId },
        returning: true,
      }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
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
});

productsRouter.delete("/:productId", async (req, res, next) => {
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
});
productsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    const product = await ProductsModel.findByPk(req.params.productId, {
      include: { model: ReviewsModel, attributes: ["review"] },
      // where: { review: { [Op.iLike]: "%good%" } },  //TODO NOT WORKING
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default productsRouter;
