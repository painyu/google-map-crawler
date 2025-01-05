import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getHealth(): Promise<string> {
    return 'Health check success';
  }
}
