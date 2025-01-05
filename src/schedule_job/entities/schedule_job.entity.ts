import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'schedule_job' })
export class ScheduleJob {
  @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  bean_name: string;
  @Column()
  params: string;
  @Column()
  cron_expression: string;
  @Column()
  status: number;
  @Column()
  country_code: string;
  @Column()
  uuid: string;
}
