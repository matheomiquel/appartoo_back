import { Dialect } from 'sequelize'
const config = {
    development: {
        username: "root",
        password: undefined,
        database: "toto",
        host: "127.0.0.1",
        dialect: "mysql" as Dialect
    },
    "test": {
        "username": "root",
        "password": undefined,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql" as Dialect
    },
    "production": {
        "username": "root",
        "password": undefined,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql" as Dialect
    }
}
type Environment = 'development' | 'test' | 'production'
export { config, Environment }
