import { Body, Controller, Delete, Get, HttpException } from '@nestjs/common';
import { Param, Post } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { AppService } from './app.service';
import { CreateBoardDto } from './dtos/boards';
import { CreateOrganizationDto } from './dtos/organizations';
import { CreateProjectDto } from './dtos/projects';
import { CreateSectionDto } from './dtos/sections';
import { CreateTaskDto } from './dtos/tasks';
import { LoginUserDto, RegisterUserDto } from './dtos/users';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('mock')
  getHello() {
    //return this.appService.getHello();
    this.appService.mockDatabase();
    throw new HttpException('Database mocked', HttpStatus.CREATED);
  }

  // ===== Organizations =====

  @Get('organizations/user/:userId')
  getUserOrganizations(@Param('userId') userId: string) {
    return this.appService.getOrganizations(parseInt(userId));
  }

  @Get('organizations/:organizationId')
  getOrganizationDetails(@Param('organizationId') orgId: string) {
    return this.appService.getOrganizationDetails(parseInt(orgId));
  }

  @Post('organizations')
  createOrganization(@Body() body: CreateOrganizationDto) {
    return this.appService.createOrganization(body);
  }

  // ===== Users =====

  @Get('users/:userId')
  getUserDetails(@Param('userId') userId: string) {
    return this.appService.getUserDetails(parseInt(userId));
  }

  @Get('users/:userId/tasks')
  getUserTasks(@Param('userId') userId: string) {
    return this.appService.getUserTasks(parseInt(userId));
  }

  @Post('users/login')
  async loginUser(@Body() body: LoginUserDto) {
    console.log(body);
    const response = await this.appService.loginUser(body);
    if (response === 'No Account') {
      throw new HttpException('No such user', HttpStatus.NOT_FOUND);
    } else if (response === 'Bad Password') {
      throw new HttpException(
        'Passwords do not match',
        HttpStatus.NOT_ACCEPTABLE,
      );
    } else {
      return response;
    }
  }

  @Post('users/register')
  async registerUser(@Body() body: RegisterUserDto) {
    const response = await this.appService.registerUser(body);
    if (response === null) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.FOUND,
      );
    } else {
      return response;
    }
  }

  // ===== Projects =====

  @Get('projects/:projectId')
  getProjectDetails(@Param('projectId') projectId: string) {
    return this.appService.getProjectDetails(parseInt(projectId));
  }

  @Post('projects')
  createProject(@Body() body: CreateProjectDto) {
    return this.appService.createProject(body);
  }

  @Delete('projects/:projectId')
  deleteProject(@Param('projectId') projectId: string) {
    return this.appService.deleteProject(parseInt(projectId));
  }

  // ===== Boards =====

  @Get('boards/:boardId')
  getBoardDetails(@Param('boardId') boardId: string) {
    return this.appService.getBoardDetails(parseInt(boardId));
  }

  @Post('boards')
  createBoard(@Body() body: CreateBoardDto) {
    return this.appService.createBoard(body);
  }

  @Delete('boards/:boardId')
  deleteBoard(@Param('boardId') boardId: string) {
    return this.appService.deleteBoard(parseInt(boardId));
  }

  // ===== Sections =====

  @Get('sections/:sectionId')
  getSectionDetails(@Param('sectionId') sectionId: string) {
    return this.appService.getSectionDetails(parseInt(sectionId));
  }

  @Post('sections')
  createSection(@Body() body: CreateSectionDto) {
    return this.appService.createSection(body);
  }

  @Delete('sections/:sectionId')
  deleteSection(@Param('sectionId') sectionId: string) {
    return this.appService.deleteSection(parseInt(sectionId));
  }

  // ===== Tasks =====

  @Get('tasks/:taskId')
  getTaskDetails(@Param('taskId') taskId: string) {
    return this.appService.getTaskDetails(parseInt(taskId));
  }

  @Post('tasks')
  createTask(@Body() body: CreateTaskDto) {
    return this.appService.createTask(body);
  }

  @Delete('tasks/:taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this.appService.deleteTask(parseInt(taskId));
  }
}
