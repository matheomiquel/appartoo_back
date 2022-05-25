import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Association } from 'sequelize'
import { sequelize } from './config'
import { RoleModel } from './role'
const table = 'pangolin_has_pangolin'
// 'projects' is excluded as it's not an attribute, it's an association.
class PangolinHasPangolinModel extends Model<InferAttributes<PangolinHasPangolinModel>, InferCreationAttributes<PangolinHasPangolinModel>>{
    // id can be undefined during creation when using `autoIncrement`
    declare pangolin_id: number
    declare friend_id: number
    declare state?: 'SEND' | 'ACCEPTED'
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
}


PangolinHasPangolinModel.init(
    {
        pangolin_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        friend_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM('SEND', 'ACCEPTED'),
            allowNull: false,
            defaultValue: 'SEND'
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
sequelize.sync();
export { PangolinHasPangolinModel }