import { Body, Controller, Param, Post } from '@nestjs/common';
import { IngestService } from './ingest.service';

@Controller('v1/ingest')
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post()
  ingest(@Body() body: any) {
    if (body.vehicleId) return this.ingestService.ingestVehicle(body);
    if (body.meterId) return this.ingestService.ingestMeter(body);
    return { message: 'Invalid payload' };
  }

  @Post('seed/:count')
  seed(@Param('count') count: string) {
    return this.ingestService.seed(Number(count));
  }
}
