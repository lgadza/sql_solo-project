import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
// import CategoriesModel from "../categories/model.js";
import ProductsModel from "../products/model.js";
// import CategoriesModel from "../categories/model.js";
// import CategoriesCategoriesModel from "./categoriesCategoriesModel.js.js";

const CategoriesModel = sequelize.define("category", {
  categoryId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
// 1 to many relationship
// ProductsModel.hasMany(CategoriesModel, { foreignKey: { allowNull: false } });
// CategoriesModel.belongsTo(ProductsModel);

// Many to many relationship
// CategoriesModel.belongsToMany(CategoriesModel, {
//   through: CategoriesCategoriesModel,
//   foreignKey: { name: "categoryId", allowNull: false },
// });
// CategoriesModel.belongsToMany(CategoriesModel, {
//   through: CategoriesCategoriesModel,
//   foreignKey: { name: "categoryId", allowNull: false },
// });

export default CategoriesModel;
