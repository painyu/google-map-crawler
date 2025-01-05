import { Module } from '@nestjs/common';
import { ScheduleJobService } from './schedule_job.service';
import { ScheduleJobController } from './schedule_job.controller';
import { ScheduleJob } from './entities/schedule_job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleJob])],
  controllers: [ScheduleJobController],
  providers: [ScheduleJobService],
})
export class ScheduleJobModule {}
