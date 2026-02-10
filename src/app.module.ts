import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestModule } from './ingest/ingest.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { VehicleHistory } from './entities/vehicle-history.entity';
import { VehicleLive } from './entities/vehicle-live.entity';
import { MeterHistory } from './entities/meter-history.entity';
import { MeterLive } from './entities/meter-live.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'energy',
      entities: [VehicleHistory, VehicleLive, MeterHistory, MeterLive],
      synchronize: true,
    }),
    IngestModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
