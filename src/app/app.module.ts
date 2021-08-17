import { Module } from '@nestjs/common';

// Commons
import { ConfigProvidersModule } from '../providers/config/config.providers.module';
import { DatabaseProvidersModule } from '../providers/database/database.providers.module';

@Module({
  imports: [
    ConfigProvidersModule,
    DatabaseProvidersModule,
  ],
})
export class AppModule {}
