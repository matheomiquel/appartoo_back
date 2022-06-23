import { CreationOptional, DataTypes, ModelDefined } from 'sequelize'
import { sequelize } from './config'
import { RoleModel } from './role'
import { PangolinDB } from '../model'
const table = 'pangolin'

const PangolinModel: ModelDefined<PangolinDB, undefined> = sequelize.define('Pangolin',
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
      allowNull: false,
      
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
  {
    tableName: table,
    underscored: true,
    freezeTableName: true
  }
)
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
export { PangolinModel }