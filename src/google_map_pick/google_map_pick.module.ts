import { Module } from '@nestjs/common';
import { GoogleMapPickService } from './google_map_pick.service';
import { GoogleMapPickController } from './google_map_pick.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleMapPick } from './entities/google_map_pick.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoogleMapPick])],
  controllers: [GoogleMapPickController],
  providers: [GoogleMapPickService],
})
export class GoogleMapPickModule {}
