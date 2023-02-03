import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import ProductsModel from "./model.js";
import ProductsCartModel from "./ProductsCartModel.js";

const CartModel = sequelize.define("Cart", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "active" },
});
export default CartModel;
