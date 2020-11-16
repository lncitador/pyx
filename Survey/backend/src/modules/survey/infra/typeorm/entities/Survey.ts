/* eslint-disable camelcase */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Id, IdDoVeiculo”Key”, ultimaVistoria, OBS - criado/atualizado
@Entity('survey')
class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vehicle_id: string;

  @Column('timestamp with time zone')
  last_survey: Date;

  @Column()
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Survey;
