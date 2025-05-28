import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultData } from '../utils/result';
import { GoogleMapPick } from './entities/google_map_pick.entity';
import { Repository } from 'typeorm';
import { CustomHttpService } from '../common/custom_http_service';
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
      .andWhere('google_map_pick.job_id = :jobId', { jobId })
      .getCount();
    if (isExit == 0) {
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
    const min = 2;
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
}
