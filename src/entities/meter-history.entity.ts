import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'meter_history' })
export class MeterHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ac_power', type: 'float' })
  acPower: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
