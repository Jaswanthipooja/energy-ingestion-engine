import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';
import { VehicleHistory } from '../entities/vehicle-history.entity';
import { VehicleLive } from '../entities/vehicle-live.entity';
import { MeterHistory } from '../entities/meter-history.entity';
import { MeterLive } from '../entities/meter-live.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleHistory,
      VehicleLive,
      MeterHistory,
      MeterLive,
    ]),
  ],
  controllers: [IngestController],
  providers: [IngestService],
})
export class IngestModule {}
