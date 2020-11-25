module.exports = {
    "type": "postgres",
    "host": process.env.POSTGRES_HOST,
    "port": 5432,
    "username": "postgres",
    "password": "docker",
    "database": "mobile",
    "entities": [
        "./src/modules/*/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
        "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
}