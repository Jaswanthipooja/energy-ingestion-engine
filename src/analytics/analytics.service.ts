import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { VehicleHistory } from '../entities/vehicle-history.entity';
import { MeterHistory } from '../entities/meter-history.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async performance(vehicleId: string) {
    const vehicleRow = await this.dataSource
      .getRepository(VehicleHistory)
      .createQueryBuilder('v')
      .select([
        'AVG(v.dcPower) as dc',
        'AVG(v.temperature) as avgTemp',
      ])
      .where('v.vehicleId = :vehicleId', { vehicleId })
      .getRawOne();

    const meterRow = await this.dataSource
      .getRepository(MeterHistory)
      .createQueryBuilder('m')
      .select(['AVG(m.acPower) as ac'])
      .getRawOne();

    const dc = Number(vehicleRow?.dc || 0);
    const ac = Number(meterRow?.ac || 0);
    const avgTemp = Number(vehicleRow?.avgtemp || 0);

    return {
      ac,
      dc,
      efficiency: dc === 0 ? 0 : ac / dc,
      avgTemp,
    };
  }
}
