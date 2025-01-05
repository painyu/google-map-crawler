import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultData } from 'src/utils/result';
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
    const googleMapList = await queryBuilder.take(5).getManyAndCount();
    return ResultData.ok({
      list: googleMapList[0],
      total: googleMapList[1],
      uuid: googleMapList[0].length === 0 ? '' : googleMapList[0][4].uuid,
    });
  }
}
