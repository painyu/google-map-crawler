import { Module } from '@nestjs/common';
import { ScheduleJobService } from './schedule_job.service';
import { ScheduleJobController } from './schedule_job.controller';

@Module({
  controllers: [ScheduleJobController],
  providers: [ScheduleJobService],
})
export class ScheduleJobModule {}
