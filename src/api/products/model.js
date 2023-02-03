import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import CategoriesModel from "../categories/model.js";
import ProductsCategoriesModel from "./productCategory.js";

const ProductsModel = sequelize.define("product", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

ProductsModel.belongsToMany(CategoriesModel, {
  through: ProductsCategoriesModel,
  foreignKey: { category: "productId", allowNull: false },
});
CategoriesModel.belongsToMany(ProductsModel, {
  through: ProductsCategoriesModel,
  foreignKey: { category: "categoryId", allowNull: false },
});

export default ProductsModel;
