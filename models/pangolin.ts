import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Association } from 'sequelize'
import { sequelize } from './config'
import { RoleModel } from './role'
const table = 'pangolin'
// 'projects' is excluded as it's not an attribute, it's an association.
class PangolinModel extends Model<InferAttributes<PangolinModel>, InferCreationAttributes<PangolinModel>>{
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>
  declare name: string
  declare email: string
  declare password: string
  declare role_id: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare static associations: {
    projects: Association<PangolinModel, RoleModel>;
  };
}


PangolinModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: table,
    underscored: true,
    freezeTableName: true
  }
);
PangolinModel.belongsTo(RoleModel, {
  foreignKey: {
    name: 'role_id'
  },
  as: 'role'
});
PangolinModel.belongsToMany(PangolinModel,
  {
    through: 'pangolin_has_pangolin',
    as: 'friend',
    foreignKey: 'pangolin_id',
  })
  PangolinModel.belongsToMany(PangolinModel,
  {
    through: 'pangolin_has_pangolin',
    as: 'other_friend',
    foreignKey: 'friend_id',
  })
sequelize.sync();
export { PangolinModel }