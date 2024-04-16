import { ImATeapotException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/report.entity';
import { UserModule } from './users/users.module';
import {User} from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities:[User,Report],
      synchronize: true,
    }),
    ReportsModule, UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
