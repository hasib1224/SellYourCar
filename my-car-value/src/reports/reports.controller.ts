import { Body, Controller, Post } from '@nestjs/common';
import { ReportDto } from './dtos/report.dto';

@Controller('report')
export class ReportsController {
    @Post('/create')
    createReport(@Body() body:ReportDto) {
        console.log(body); // TODO: Implement report creation logic

    }
}
