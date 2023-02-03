import { DataTypes } from "sequelize";
import sequelize from "../../db.js";

const usersCategoriesModel = sequelize.define("userProduct", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

export default usersCategoriesModel;
