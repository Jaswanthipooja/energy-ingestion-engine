import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { VehicleHistory } from '../entities/vehicle-history.entity';
import { VehicleLive } from '../entities/vehicle-live.entity';
import { MeterHistory } from '../entities/meter-history.entity';
import { MeterLive } from '../entities/meter-live.entity';

@Injectable()
export class IngestService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async ingestVehicle(body: any) {
    const repo = this.dataSource.getRepository(VehicleHistory);

    const row = repo.create({
      vehicleId: body.vehicleId,
      dcPower: Number(body.dcPower),
      acPower: Number(body.acPower),
      temperature: Number(body.temperature),
    });

    await repo.save(row);
    return { status: 'vehicle_ingested' };
  }

  async ingestMeter(body: any) {
    const repo = this.dataSource.getRepository(MeterHistory);

    const row = repo.create({
      acPower: Number(body.acPower),
    });

    await repo.save(row);
    return { status: 'meter_ingested' };
  }

  async seed(count: number) {
    const vehicleRepo = this.dataSource.getRepository(VehicleHistory);
    const meterRepo = this.dataSource.getRepository(MeterHistory);

    const vehicles: VehicleHistory[] = [];
    const meters: MeterHistory[] = [];

    for (let i = 0; i < count; i++) {
      vehicles.push(
        vehicleRepo.create({
          vehicleId: `VH-${(i % 5) + 1}`,
          dcPower: Number((Math.random() * 50 + 10).toFixed(2)),
          acPower: Number((Math.random() * 30 + 5).toFixed(2)),
          temperature: Number((Math.random() * 15 + 20).toFixed(2)),
        }),
      );

      meters.push(
        meterRepo.create({
          acPower: Number((Math.random() * 40 + 10).toFixed(2)),
        }),
      );
    }

    await vehicleRepo.save(vehicles);
    await meterRepo.save(meters);

    return { inserted: count };
  }
}
