import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultData } from '../utils/result';
import { GoogleMapPick } from './entities/google_map_pick.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleMapPickService {
  constructor(
    @InjectRepository(GoogleMapPick)
    private readonly googleMapRepository: Repository<GoogleMapPick>,
  ) {}
  async queryPage(uuid: string, jobId: string): Promise<ResultData> {
    const queryBuilder = this.googleMapRepository
      .createQueryBuilder('google_map_pick')
      .andWhere('google_map_pick.job_id = :jobId', { jobId });
    if (uuid) {
      queryBuilder.andWhere('google_map_pick.uuid > :uuid', { uuid });
    }
    const min = 3;
    const max = 5;
    const take = Math.floor(Math.random() * (max - min + 1)) + min;
    const googleMapList = await queryBuilder
      .orderBy({ uuid: 'ASC' })
      .take(take)
      .getManyAndCount();
    return ResultData.ok({
      list: googleMapList[0],
      uuid:
        googleMapList[0].length === 0 ? '' : googleMapList[0][take - 1].uuid,
    });
  }
}
