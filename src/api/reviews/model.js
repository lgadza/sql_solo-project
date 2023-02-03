import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import ProductsModel from "../products/model.js";
const ReviewsModel = sequelize.define("review", {
  reviewId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  review: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// 1 to many relationship
ProductsModel.hasMany(ReviewsModel, { foreignKey: { allowNull: false } });
ReviewsModel.belongsTo(ProductsModel);

// Many to many relationship
// ReviewsModel.belongsToMany(CategoriesModel, {
//   through: ReviewsCategoriesModel,
//   foreignKey: { name: "reviewId", allowNull: false },
// });
// CategoriesModel.belongsToMany(ReviewsModel, {
//   through: ReviewsCategoriesModel,
//   foreignKey: { name: "categoryId", allowNull: false },
// });

export default ReviewsModel;
