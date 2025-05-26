import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultData } from '../utils/result';
import { GoogleMapPick } from './entities/google_map_pick.entity';
import { Repository } from 'typeorm';
import { CustomHttpService } from 'src/common/custom_http_service';
import axios from 'axios';
@Injectable()
export class GoogleMapPickService {
  private readonly logger = new Logger(GoogleMapPickService.name);
  constructor(
    @InjectRepository(GoogleMapPick)
    private readonly googleMapRepository: Repository<GoogleMapPick>,
    private readonly customHttpService: CustomHttpService,
  ) {}

  async queryPage(id: number, jobId: string): Promise<ResultData> {
    const isExit = await this.googleMapRepository
      .createQueryBuilder('google_map_pick')
      .andWhere('google_map_pick.id = :id', { id })
      .getOne();
    if (!isExit) {
      return ResultData.ok({
        list: [],
        id: null,
      });
    }
    const queryBuilder = this.googleMapRepository
      .createQueryBuilder('google_map_pick')
      .andWhere('google_map_pick.job_id = :jobId', { jobId });
    if (id) {
      queryBuilder.andWhere('google_map_pick.id > :id', { id });
    }
    const min = 3;
    const max = 5;
    const take = Math.floor(Math.random() * (max - min + 1)) + min;
    const googleMapList = await queryBuilder
      .orderBy({ id: 'ASC' })
      .take(take)
      .getManyAndCount();
    return ResultData.ok({
      list: googleMapList[0],
      id:
        googleMapList[0].length < take
          ? null
          : googleMapList[0].length === 0
            ? null
            : googleMapList[0][take - 1].id,
    });
  }

  async fetchData(): Promise<ResultData> {
    try {
      const response = await this.customHttpService.get(
        'https://www.google.com.hk/search?tbm=map&authuser=0&hl=zh-CN&gl=hk&pb=!4m12!1m3!1d123000.93715408974!2d114.12769938113088!3d22.352567256815625!2m3!1f0!2f0!3f0!3m2!1i1680!2i400!4f13.1!7i20!10b1!12m25!1m5!18b1!30b1!31m1!1b1!34e1!2m3!5m1!6e2!20e3!4b0!10b1!12b1!13b1!16b1!17m1!3e1!20m4!5e2!6b1!8b1!14b1!46m1!1b0!96b1!19m4!2m3!1i360!2i120!4i8!20m48!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!22m6!1s_gz_Z4m_KaiUvr0P5aDlqAQ%3A5!2s1i%3A0%2Ct%3A11887%2Cp%3A_gz_Z4m_KaiUvr0P5aDlqAQ%3A5!7e81!12e3!17s_gz_Z4m_KaiUvr0P5aDlqAQ%3A48!18e15!24m108!1m32!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m21!3b1!4b1!5b1!6b1!9b1!12b1!13b1!14b1!17b1!20b1!21b1!22b1!25b1!27m1!1b0!28b0!32b1!33m1!1b1!34b0!36e1!10m1!8e3!11m1!3e1!14m1!3b0!17b1!20m2!1e3!1e6!24b1!25b1!26b1!29b1!30m1!2b1!36b1!39m3!2m2!2i1!3i1!43b1!52b1!54m1!1b1!55b1!56m1!1b1!65m5!3m4!1m3!1m2!1i224!2i298!71b1!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!125b0!126b1!127b1!26m4!2m3!1i80!2i92!4i8!30m28!1m6!1m2!1i0!2i0!2m2!1i530!2i400!1m6!1m2!1i1630!2i0!2m2!1i1680!2i400!1m6!1m2!1i0!2i0!2m2!1i1680!2i20!1m6!1m2!1i0!2i380!2m2!1i1680!2i400!34m19!2b1!3b1!4b1!6b1!8m6!1b1!3b1!4b1!5b1!6b1!7b1!9b1!12b1!14b1!20b1!23b1!25b1!26b1!31b1!37m1!1e81!42b1!47m0!49m10!3b1!6m2!1b1!2b1!7m2!1e3!2b1!8b1!9b1!10e2!50m4!2e2!3m2!1b1!3b1!67m3!7b1!10b1!14b1!69i729&q=agent&oq=agent&gs_l=maps.12...0.0.2.8148.0.0.....0.0..0.....0......maps..0.0.0.0.&tch=1&ech=2&psi=_gz_Z4m_KaiUvr0P5aDlqAQ.1744768257702.1',
      );
      return ResultData.ok({
        data: response.toString(),
      });
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }
  async searchLocations(url_th: string): Promise<ResultData> {
    return await this.fetchRawData(url_th);
  }
  private async fetchRawData(url_th: string): Promise<any> {
    try {
      const response = await this.customHttpService.get(url_th, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
          'Accept-Language': 'zh-CN,zh;q=0.9',
        },
      });
      // 增强型数据清洗
      const cleanedData = this.cleanGoogleJson(response.toString());
      // this.logger.debug(`Cleaned JSON: ${cleanedData.substring(0, 300)}...`);
      return cleanedData;
    } catch (error) {
      this.logger.error(`请求失败: ${error.message}`, error.stack);
      throw new Error(`数据获取失败: ${this.getErrorMessage(error)}`);
    }
  }

  private getErrorMessage(error: any): string {
    if (error.response) {
      return `Google API 响应异常 [${error.response.status}] ${error.response.data?.substring(0, 100)}`;
    }
    return error.message;
  }
  // 新增专业清洗方法
  private async cleanGoogleJson(rawData: string): Promise<GoogleMapPick[]> {
    const json = JSON.parse(rawData.replace(/\/\*+[\s\S]*?\*+\//g, ''));
    const tracStr = JSON.parse(json['d'].replace(/^\)\]\}'\n?/g, ''));
    return await this.parsePlaceFromJson(tracStr[64]);
  }

  async parsePlaceFromJson(data: any[]) {
    const result: GoogleMapPick[] = [];
    data.forEach((mode) => {
      const raw = mode[1]; // 主要信息块
      const name = raw?.[11]; // 名称
      const address_details = raw?.[18]; // 地址
      const latitude = raw?.[9]?.[2] ?? raw?.[10]?.[2];
      const longitude = raw?.[9]?.[3] ?? raw?.[10]?.[3];
      const categories = raw?.[13] ?? raw?.[2]?.[0];
      const website = raw?.[75]?.[0]?.[0]?.[2]?.[0]?.[1]?.[2]?.[0]; // 网站链接
      const phone = raw?.[178]?.[0]?.[0]; // 电话，位置不确定，可能需要遍历查找
      const country = raw?.[183]?.[1]?.[6];
      const province = raw?.[183]?.[1]?.[3];
      const street = raw?.[183]?.[1]?.[2];
      const address = raw?.[183]?.[1]?.[1];
      const google_id = raw?.[1];
      const photos: string[] = [];
      const photoGroups = raw?.[178];
      if (photoGroups && Array.isArray(photoGroups)) {
        photos.push(photoGroups[0][1]);
      }
      result.push({
        google_id: google_id,
        google_name: name,
        phone: phone,
        labels: JSON.stringify(categories),
        website: website,
        address: address,
        latitude: latitude,
        longitude: longitude,
        country: country,
        province: province,
        street: street,
        address_details: address_details,
        id: 0,
        emails: '',
        city: '',
        region: '',
        postCode: '',
        job_id: '',
      });
    });
    this.googleMapRepository.save(result);
    return result;
  }

  //----------------------------------------------------
  EARTH_RADIUS = 6370.856;
  RAD_PER_DEGREE = (2 * Math.PI) / 360;

  agents = [
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
    'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.249.0 Safari/532.5',
    'Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US) AppleWebKit/532.9 (KHTML, like Gecko) Chrome/5.0.310.0 Safari/532.9',
  ];

  async fetchCompanies(lat: number, lng: number): Promise<any[]> {
    const d1Dict = this.getZoomLevels();
    const companiesByZoom: Record<number, any[]> = {};

    for (const zoom of Object.keys(d1Dict).map(Number)) {
      const d1 = d1Dict[zoom];
      const url = `https://www.google.com/search?tbm=map&authuser=0&hl=en&pb=!4m12!1m3!1d${d1}!2d${lng}!3d${lat}`;
      let page = 0;
      const results: any[] = [];

      while (true) {
        const pageId = page === 0 ? '' : `!8i${page}`;
        const finalUrl = `${url}${this.pageSuffix(pageId)}`;

        try {
          const response = await axios.get(finalUrl, {
            headers: { 'User-Agent': this.randomAgent() },
          });
          const pageResults = this.parseCompanyData(response.data);
          if (!pageResults.length) break;

          results.push(...pageResults);
          page += 20;
        } catch (err) {
          this.logger.error(`Error fetching zoom ${zoom}:`, err);
          break;
        }
      }

      companiesByZoom[zoom] = results;
    }

    return (
      companiesByZoom[Math.max(...Object.keys(companiesByZoom).map(Number))] ||
      []
    );
  }

  private parseCompanyData(rawText: string): any[] {
    try {
      const json = JSON.parse(rawText.replace('/*""*/', ''));
      const dStr = json.d.replace(")]}'", '').trim();
      const dList = JSON.parse(dStr);
      const companyList = dList[0][1];
      const results: any[] = [];

      for (const company of companyList) {
        const name = company[14]?.[11];
        const url = decodeURIComponent(company[14]?.[7]?.[0] || '');
        const address = company[14]?.[39] || company[14]?.[18];
        const phone = company[14]?.[178]?.[0]?.[0] || company[14]?.[3]?.[0];
        const category = company[14]?.[13]?.join('>') || '';
        const city = company[14]?.[14];

        if (name) {
          results.push({ name, url, address, phone, category, city });
        }
      }

      return results;
    } catch (e) {
      this.logger.error('Failed to parse company data', e);
      return [];
    }
  }

  private getZoomLevels(): Record<number, number> {
    const zoomLevels: Record<number, number> = { 2: 94618532.08008283 };
    for (let z = 3; z <= 21; z++) {
      zoomLevels[z] = zoomLevels[z - 1] / 2;
    }
    return zoomLevels;
  }

  private pageSuffix(pageId: string): string {
    return `!2m3!1f0!2f0!3f0!3m2!1i784!2i644!4f13.1!7i20${pageId}!10b1!...`;
  }

  private randomAgent(): string {
    return this.agents[Math.floor(Math.random() * this.agents.length)];
  }

  private latKmToDegree(disKm = 111, radius = this.EARTH_RADIUS): number {
    return disKm / radius / this.RAD_PER_DEGREE;
  }

  private lngKmToDegree(disKm = 1, centerLat = 22): number {
    const realRadius =
      this.EARTH_RADIUS * Math.cos(centerLat * this.RAD_PER_DEGREE);
    return disKm / realRadius / this.RAD_PER_DEGREE;
  }
}
