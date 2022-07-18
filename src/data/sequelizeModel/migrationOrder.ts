import { PangolinHasPangolinModel } from './pangolin_has_pangolin'
import { PangolinModel } from './pangolin'
import { RoleModel } from './role'
import { sequelize } from './config'



(async () => {
    try {
        await RoleModel.sync()
        await PangolinModel.sync()
        await PangolinHasPangolinModel.sync()
    } catch (e) {
        console.log(e)
    }
})()

