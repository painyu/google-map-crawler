import { Module } from '@nestjs/common';
import { GoogleMapPickService } from './google_map_pick.service';
import { GoogleMapPickController } from './google_map_pick.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleMapPick } from './entities/google_map_pick.entity';
import { CustomHttpService } from 'src/common/custom_http_service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([GoogleMapPick])],
  controllers: [GoogleMapPickController],
  providers: [GoogleMapPickService, CustomHttpService],
})
export class GoogleMapPickModule {}
