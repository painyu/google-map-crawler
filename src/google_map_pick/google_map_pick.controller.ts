import { Controller, Get, Query } from '@nestjs/common';
import { GoogleMapPickService } from './google_map_pick.service';
import { ResultData } from 'src/utils/result';

@Controller('google/map')
export class GoogleMapPickController {
  private readonly BASE_URL = 'https://www.google.com.hk/search';
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

  @Get('/search')
  async search(): Promise<ResultData> {
    try {
      const url = this.buildMedicalAgentUrl({
        coordinates: {
          lat: 22.323873,
          lng: 114.168944,
          zoom: 14,
        },
        display: {
          width: 1680,
          height: 497,
        },
        sessionId: this.generateSessionId(),
      });
      console.log(url);
      return await this.googleMapPickService.searchLocations(url);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  /**
   * 构建完整地图搜索URL
   */
  buildMedicalAgentUrl(options: {
    coordinates: {
      lat: number; // 纬度
      lng: number; // 经度
      zoom?: number; // 缩放级别 1-20
    };
    display: {
      width: number; // 显示宽度(px)
      height: number; // 显示高度(px)
    };
    sessionId: string; // 会话ID
  }): string {
    const params = new URLSearchParams({
      tbm: 'map',
      authuser: '0',
      hl: 'zh-CN',
      gl: 'hk',
      q: 'medical agent',
      oq: 'medical agent',
      pb: this.generatePbParam(options),
      gs_l: 'maps.12..38i72k1.34391.37108.1.40070.4.4.....299.482.0j1j1.2.....0....1j4..maps..2.1.306.0.',
      tch: '1',
      ech: '1',
      psi: options.sessionId,
    });

    return `${this.BASE_URL}?${params.toString()}`;
  }

  /**
   * 生成PB参数核心逻辑
   */
  private generatePbParam(options: {
    coordinates: { lat: number; lng: number; zoom?: number };
    display: { width: number; height: number };
  }): string {
    const { lat, lng, zoom = 12 } = options.coordinates;
    const { width, height } = options.display;

    // 精度计算 (zoom级别转换)
    const precision = 10000 / Math.pow(2, zoom - 1);

    return [
      '!4m12',
      `!1m3!1d${precision.toFixed(12)}`,
      `!2d${lng}`,
      `!3d${lat}`,
      '!2m3!1f0!2f0!3f0',
      `!3m2!1i${width}!2i${height}`,
      '!4f13.1',
      '!7i20',
      '!10b1',
      '!12m25!1m5!18b1!30b1!31m1!1b1!34e1',
      '!2m3!5m1!6e2!20e3!4b0!10b1!12b1!13b1!16b1',
      '!17m1!3e1!20m4!5e2!6b1!8b1!14b1',
      '!46m1!1b0!96b1!19m4!2m3!1i360!2i120!4i8',
      // ...其他固定参数部分 (完整版需包含所有原参数)
      `!69i${Date.now() % 1000}`, // 动态时间戳
    ].join('');
  }

  /**
   * 生成随机会话ID
   */
  generateSessionId(length = 16): string {
    return Array.from(
      { length },
      () =>
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
          Math.floor(Math.random() * 62)
        ],
    ).join('');
  }
  @Get('companies')
  async getCompanies(@Query('lat') lat: number, @Query('lng') lng: number) {
    if (!lat || !lng) {
      return { error: 'Missing latitude or longitude parameters' };
    }
    const companies = await this.googleMapPickService.fetchCompanies(lat, lng);
    return { count: companies.length, results: companies };
  }
}
