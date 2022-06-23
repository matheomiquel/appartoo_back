import { DataTypes, ModelDefined } from 'sequelize'
import { PangolinHasPangolinDB } from '../model'
import { sequelize } from './config'
const table = 'pangolin_has_pangolin'

const PangolinHasPangolinModel: ModelDefined<PangolinHasPangolinDB, undefined> = sequelize.define('PangolinHasPangolinModel',
    {
        pangolin_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                key: 'id',
                model: {
                    tableName: 'pangolin',
                }
            }
        },
        friend_id: {
            references: {
                key: 'id',
                model: {
                    tableName: 'pangolin',
                }
            },
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
        tableName: table,
        underscored: true,
        freezeTableName: true
    }
)
export { PangolinHasPangolinModel }