import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'
import { sequelize } from './config'
const table = 'role'
// 'projects' is excluded as it's not an attribute, it's an association.
class RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>>{
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>
  declare name: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}


RoleModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    tableName: table,
    freezeTableName: true
  }
);
sequelize.sync();
export { RoleModel }