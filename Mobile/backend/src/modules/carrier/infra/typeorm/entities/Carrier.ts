/* eslint-disable camelcase */
import Vehicle from '@modules/vehicle/infra/typeorm/entities/Vehicle';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('carrier')
class Carrier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name?: string;

  @Column()
  cnpj: string;

  @Column()
  responsible?: string;

  @OneToMany(() => Vehicle, vehicle => vehicle.carrier)
  vehicles: Vehicle[];

  @Column()
  email?: string;

  @Column('json')
  address?: string;

  @Column()
  phone?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Carrier;
