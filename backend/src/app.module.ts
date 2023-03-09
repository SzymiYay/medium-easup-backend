import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Board } from './entities/Board';
import { Organization } from './entities/Organization';
import { Project } from './entities/Project';
import { Section } from './entities/Section';
import { Task } from './entities/Task';
import { Person } from './entities/Person';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Organization, Board, Project, Section, Task, Person],
      synchronize: (process.env.POSTGRES_SYNCHRONIZE == "true" || process.env.POSTGRES_SYNCHRONIZE == "TRUE")
    }),
    TypeOrmModule.forFeature([Board, Organization, Project, Section, Task, Person])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
