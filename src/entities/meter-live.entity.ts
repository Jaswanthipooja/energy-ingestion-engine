import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('meter_live_status')
export class MeterLive {
  @PrimaryColumn()
  meterId: string;

  @Column('float')
  kwhConsumedAc: number;

  @Column('float')
  voltage: number;

  @Column()
  timestamp: Date;
}
