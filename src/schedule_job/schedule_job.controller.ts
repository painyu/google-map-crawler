import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ScheduleJobService } from './schedule_job.service';
import { CreateScheduleJobDto } from './dto/create-schedule_job.dto';
import { ResultData } from 'src/utils/result';

@Controller('schedule/job')
export class ScheduleJobController {
  constructor(private readonly scheduleJobService: ScheduleJobService) {}
  /**
   * 创建爬取任务
   * @param createDto 参数对象
   * @returns
   */
  @Post('/create')
  async create(@Body() createDto: CreateScheduleJobDto): Promise<ResultData> {
    return await this.scheduleJobService.create(createDto);
  }
  /**
   * 查询所有正常任务
   * @returns
   */
  @Get('/findAll')
  async findAll(): Promise<ResultData> {
    return await this.scheduleJobService.findAll();
  }
  /**
   * 根据编号查询任务详情
   * @param id 编号
   * @returns
   */
  @Get('/findOne/:id')
  async findOne(@Param('id') id: number): Promise<ResultData> {
    return await this.scheduleJobService.findOne(+id);
  }
}
