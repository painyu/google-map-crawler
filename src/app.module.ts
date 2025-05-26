import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ThrottlerModule } from '@nestjs/throttler';
import { GoogleMapPickModule } from './google_map_pick/google_map_pick.module';
import { ScheduleJobModule } from './schedule_job/schedule_job.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '81.69.17.124',
      port: 3306,
      username: 'pick_yong',
      password: 'CuJuuw31F7@U19bkD!Tc_yong',
      database: 'info_collect',
      entities: [`${__dirname}/**/*.entity{.ts}`],
      autoLoadEntities: true,
      keepConnectionAlive: true,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
      // logger: "file",
      ssl: false,
      // extra: {
      //   sslmode: 'require',
      // },
    }),
    GoogleMapPickModule,
    ScheduleJobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
