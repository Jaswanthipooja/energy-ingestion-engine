import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('v1/analytics')
export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  @Get('performance/:vehicleId')
  performance(@Param('vehicleId') id: string) {
    return this.service.performance(id);
  }
}
