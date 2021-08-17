import { Module } from '@nestjs/common';

// Commons
import { ConfigProvidersModule } from '../providers/config/config.providers.module';
import { DatabaseProvidersModule } from '../providers/database/database.providers.module';
import { UsersModule } from '../modules/users/users.module';

@Module({
  imports: [ConfigProvidersModule, DatabaseProvidersModule, UsersModule],
})
export class AppModule {}
