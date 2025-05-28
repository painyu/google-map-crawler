import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'schedule_job' })
export class ScheduleJob {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  params: string;
  @Column()
  status: number;
  @Column()
  country_code: string;
  @Column()
  remark: string;
  @Column()
  uuid: string;
}
