/* eslint-disable camelcase */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('employeers')
class Employeer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  registry: string;

  @Column()
  fullName: string;

  @Column()
  cpf: string;

  @Column()
  adress: string;

  @Column('integer')
  number: number;

  @Column()
  city: string;

  @Column()
  borne: string;

  @Column()
  subsidiary: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Employeer;
