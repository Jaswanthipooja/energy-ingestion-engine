import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'vehicle_history' })
export class VehicleHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'vehicle_id' })
  vehicleId: string;

  @Column({ name: 'dc_power', type: 'float' })
  dcPower: number;

  @Column({ name: 'ac_power', type: 'float' })
  acPower: number;

  @Column({ name: 'temperature', type: 'float' })
  temperature: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
