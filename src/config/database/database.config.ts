import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/users/entities/user.entity';
import { UserKnowledgeEntity } from '../../modules/users/entities/user-knowledge.entity';

export const databaseConfigService: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity, UserKnowledgeEntity],
  cli: {
    migrationsDir: process.env.DB_MIGRATION_DIR,
  },
  synchronize: false,
  logging: false,
};
