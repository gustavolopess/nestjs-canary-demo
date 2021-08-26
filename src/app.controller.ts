import { Controller, Get, InternalServerErrorException, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('version')
  getVersion(): string {
    return this.appService.getVersion();
  }

  @Get('error/:prob')
  randomError(@Param('prob') errorProbability: number): string {
    if (Math.random() > errorProbability / 100) {
      return this.appService.getVersion();
    }

    throw new InternalServerErrorException('Error');
  }

  @Get('sleep/:milliseconds')
  async sleepAndReturn(@Param('milliseconds') milliseconds: number): Promise<string> {
    await new Promise(r => setTimeout(r, milliseconds));

    return this.appService.getVersion();
  }

  @Get('health')
  async healthCheck(): Promise<string> {
    return 'Service is up and running! :-)'
  }
}
