import { RoleModel, sequelize } from '../models'

function create_role() {
    RoleModel.create({
        name: 'Warrior',
    })
    RoleModel.create({
        name: 'Sorcerer',
    })
    RoleModel.create({
        name: 'Alchemist',
    })
    RoleModel.create({
        name: 'Spies',
    })
    RoleModel.create({
        name: 'Enchanter',
    })
}
(async () => {
    await sequelize.sync()
    await create_role();
})();