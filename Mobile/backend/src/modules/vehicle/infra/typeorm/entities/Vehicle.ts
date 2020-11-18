/* eslint-disable camelcase */
import Carrier from '@modules/carrier/infra/typeorm/entities/Carrier';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vehicle')
class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plate: string;

  @Column()
  driver: string;

  @Column()
  carrier_id: string;

  @ManyToOne(() => Carrier, carrier => carrier.vehicles)
  @JoinColumn({ name: 'carrier_id' })
  carrier: Carrier;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Vehicle;
