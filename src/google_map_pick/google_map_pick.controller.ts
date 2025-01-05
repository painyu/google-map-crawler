import { Controller, Get, Query } from '@nestjs/common';
import { GoogleMapPickService } from './google_map_pick.service';

@Controller('google/map')
export class GoogleMapPickController {
  constructor(private readonly googleMapPickService: GoogleMapPickService) {}
  /**
   * 查询任务爬取的记录
   * @param uuid 记录ID
   * @param jobId 任务ID
   * @returns
   */
  @Get('/queryPage')
  async queryPage(@Query('uuid') uuid: string, @Query('jobId') jobId: string) {
    return await this.googleMapPickService.queryPage(uuid, jobId);
  }
}
