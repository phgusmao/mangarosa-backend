module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: [process.env.DB_MIGRATIONS],
  cli: {
    migrationsDir: process.env.DB_MIGRATION_DIR,
  },
  seeds: [process.env.DB_SEEDS],
  synchronize: false,
  logging: +process.env.DB_LOGGING,
};
