import { Sequelize } from 'sequelize'
import { config, Environment } from '../config/config'
const env = process.env.NODE_ENV as Environment || 'development'
const configuration = config[env]
const sequelize = new Sequelize(configuration.database, configuration.username, configuration.password, configuration)
export { sequelize }