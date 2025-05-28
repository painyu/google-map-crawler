import { Controller, Get, Query } from '@nestjs/common';
import { GoogleMapPickService } from './google_map_pick.service';
import { ResultData } from 'src/utils/result';

@Controller('google/map')
export class GoogleMapPickController {
  constructor(private readonly googleMapPickService: GoogleMapPickService) {}
  /**
   * 查询任务爬取的记录
   * @param id 记录ID
   * @param jobId 任务ID
   * @returns
   */
  @Get('/queryPage')
  async queryPage(
    @Query('id') id: number,
    @Query('jobId') jobId: string,
  ): Promise<ResultData> {
    return await this.googleMapPickService.queryPage(id, jobId);
  }
}
