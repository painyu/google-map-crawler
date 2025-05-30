import { Injectable } from '@nestjs/common';
import { CreateScheduleJobDto } from './dto/create-schedule_job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleJob } from './entities/schedule_job.entity';
import { Repository } from 'typeorm';
import { ResultData } from '../utils/result';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ScheduleJobService {
  constructor(
    @InjectRepository(ScheduleJob)
    private readonly scheduleJobRepository: Repository<ScheduleJob>,
  ) {}

  async create(createDto: CreateScheduleJobDto): Promise<ResultData> {
    const googleMapPick = this.scheduleJobRepository.create(createDto);
    googleMapPick.uuid = uuidv4();
    await this.scheduleJobRepository.save(googleMapPick);
    return ResultData.ok({ uuid: googleMapPick.uuid });
  }

  async findAll(): Promise<ResultData> {
    const jobList = await this.scheduleJobRepository
      .createQueryBuilder('schedule_job')
      .andWhere({ status: 0 })
      .getMany();
    return ResultData.ok({ data: jobList });
  }

  async findOne(id: number): Promise<ResultData> {
    const job = await this.scheduleJobRepository
      .createQueryBuilder('schedule_job')
      .andWhere({ id: id })
      .getOne();
    return ResultData.ok({ data: job });
  }
}
