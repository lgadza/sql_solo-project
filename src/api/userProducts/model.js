import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import CategoriesModel from "../categories/model.js";
import UsersModel from "../users/model.js";
import UsersCategoriesModel from "./usersCategoriesModel.js";

const UsersModel = sequelize.define("user", {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// 1 to many relationship
UsersModel.hasMany(UsersModel, { foreignKey: { allowNull: false } });
UsersModel.belongsTo(UsersModel);

// Many to many relationship
UsersModel.belongsToMany(CategoriesModel, {
  through: UsersCategoriesModel,
  foreignKey: { name: "userId", allowNull: false },
});
CategoriesModel.belongsToMany(UsersModel, {
  through: UsersCategoriesModel,
  foreignKey: { name: "categoryId", allowNull: false },
});

export default UsersModel;
