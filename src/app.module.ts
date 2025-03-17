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
      type: 'postgres',
      host: 'aws-0-us-east-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.cwgjjafwtxafcplbyeeg',
      password: 'TuUXkZCDcKhE7dnL',
      database: 'postgres',
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
