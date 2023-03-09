import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Board } from './entities/Board';
import { Organization } from './entities/Organization';
import { Project } from './entities/Project';
import { Section } from './entities/Section';
import { Task } from './entities/Task';
import { Person } from './entities/Person';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Board) private boardRepo: Repository<Board>,
    @InjectRepository(Organization) private orgRepo: Repository<Organization>,
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Person) private userRepo: Repository<Person>,
  ) {}

  // ===== Organizations =====

  async getOrganizations(userId: number) {
    const data = await this.orgRepo.findBy({
      users: {
        id: userId,
      },
    });
    return data;
  }

  async getOrganizationDetails(orgId: number) {
    const data = await this.orgRepo.findOne({
      relations: ['projects'],
      where: {
        id: orgId,
      },
    });
    return data;
  }

  async createOrganization(body) {
    const newOrganization = this.orgRepo.create({
      name: body.name,
      description: body.description,
      mission: body.mission,
      webpage: body.webpage,
      logo: body.logo,
      details: body.details,
      users: [],
      projects: [],
    });
    newOrganization.users.push(
      await this.userRepo.findOneBy({
        id: body.ownerId,
      }),
    );
    await this.orgRepo.save(newOrganization);
    return await this.orgRepo.findOne({
      relations: ['projects'],
      where: {
        id: newOrganization.id,
      },
    });
  }

  // ===== Users =====

  async getUserDetails(userId: number) {
    const data = await this.userRepo.findOne({
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        nickname: true,
        description: true,
        photo: true,
      },
      where: {
        id: userId,
      },
    });
    return data;
  }

  async getUserTasks(userId: number) {
    const data = await this.taskRepo.find({
      where: {
        users: {
          id: userId,
        },
      },
    });
    return data;
  }

  async loginUser(body) {
    const user = await this.userRepo.findOneBy({
      email: body.email,
    });

    if (user === null) {
      return 'No Account';
    }

    if (user.password === body.password) {
      user.password = null;
      return user;
    } else {
      return 'Bad Password';
    }
  }

  async registerUser(body) {
    const user = await this.userRepo.findOneBy({
      email: body.email,
    });

    if (user != null) {
      return null;
    }

    const newUser = this.userRepo.create({
      email: body.email,
      name: body.name,
      surname: body.surname,
      nickname: body.nickname,
      password: body.password,
      description: body.description,
      photo: body.photo,
      tasks: [],
      projects: [],
      organizations: [],
    });
    await this.userRepo.save(newUser);
    newUser.password = null;
    return newUser;
  }

  // ===== Projects =====

  async getProjectDetails(projectId: number) {
    const data = await this.projectRepo.findOne({
      relations: ['boards'],
      where: {
        id: projectId,
      },
    });
    return data;
  }

  async createProject(body) {
    const newProject = this.projectRepo.create({
      name: body.name,
      description: body.description,
      details: body.details,
      organization: body.organizationId,
      boards: [],
      users: [],
    });
    await this.projectRepo.save(newProject);
    return newProject;
  }

  async deleteProject(projectId: number) {
    const response = await this.projectRepo.delete({ id: projectId });
    return response;
  }

  // ===== Boards =====

  async getBoardDetails(boardId: number) {
    const data = await this.boardRepo.findOne({
      relations: ['sections'],
      where: {
        id: boardId,
      },
    });
    return data;
  }

  async createBoard(body) {
    const newBoard = this.boardRepo.create({
      name: body.name,
      description: body.description,
      project: body.projectId,
      sections: [],
    });
    await this.boardRepo.save(newBoard);
    return newBoard;
  }

  async deleteBoard(boardId: number) {
    const result = await this.boardRepo.delete({ id: boardId });
    return result;
  }

  // ===== Sections =====

  async getSectionDetails(sectionId: number) {
    const data = await this.sectionRepo.findOne({
      relations: ['tasks'],
      where: {
        id: sectionId,
      },
    });
    return data;
  }

  async createSection(body) {
    const newSection = this.sectionRepo.create({
      name: body.name,
      description: body.description,
      board: body.boardId,
      tasks: [],
    });
    await this.sectionRepo.save(newSection);
    return newSection;
  }

  async deleteSection(sectionId: number) {
    const response = await this.sectionRepo.delete({ id: sectionId });
    return response;
  }

  // ===== Tasks =====

  async getTaskDetails(taskId: number) {
    const data = await this.taskRepo.findOneBy({
      id: taskId,
    });
    return data;
  }

  async createTask(body) {
    const section = await this.sectionRepo.findOneBy({
      id: body.sectionId,
    });

    const newTask = this.taskRepo.create({
      name: body.name,
      description: body.description,
      deadline: body.deadline,
      sections: [section],
    });
    await this.taskRepo.save(newTask);
    return newTask;
  }

  async deleteTask(taskId: number) {
    const result = await this.taskRepo.findOneBy({ id: taskId });
    result.sections = [];
    await this.taskRepo.save(result);
    return await this.taskRepo.remove(result);
  }

  // ===== Debug =====

  async mockDatabase() {
    const patryk = this.userRepo.create({
      email: 'patryk@gmail.com',
      name: 'Patryk',
      surname: 'Lesiak',
      nickname: 'vLesio',
      password: 'qwerty',
      description: 'I have crippling depression.',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Coelho-5829.jpg/1200px-Coelho-5829.jpg',
      tasks: [],
      projects: [],
    });

    const maciek = this.userRepo.create({
      email: 'maciej@gmail.com',
      name: 'Maciej',
      surname: 'Pieniazek',
      nickname: 'Kaszet',
      password: 'qwerty',
      description: 'I do not even know what I am doing.',
      photo: null,
      tasks: [],
      projects: [],
    });

    const adrian = this.userRepo.create({
      email: 'adrian@gmail.com',
      name: 'Adrian',
      surname: 'Markowski',
      nickname: 'Adrianoooooooooo',
      password: 'qwerty',
      description: 'I am, that is all.',
      photo: null,
      tasks: [],
      projects: [],
    });

    const easup = this.orgRepo.create({
      name: 'Easup Inc.',
      description: 'Best platform for task management.',
      mission: 'We are here to not pass this semester!',
      webpage: null,
      logo: 'https://i5.walmartimages.ca/images/Large/234/6_r/6000191272346_R.jpg',
      details: null,
      projects: [],
      users: [],
    });
    easup.users.push(patryk);
    easup.users.push(maciek);
    easup.users.push(adrian);

    const oweme = this.orgRepo.create({
      name: 'OweMe',
      description: 'You owe me homie!',
      mission: 'To get your money back!',
      webpage: null,
      logo: 'https://i5.walmartimages.ca/images/Large/234/6_r/6000191272346_R.jpg',
      details: null,
      projects: [],
      users: [],
    });
    oweme.users.push(patryk);
    oweme.users.push(maciek);

    await this.userRepo.save(patryk);
    await this.userRepo.save(maciek);
    await this.userRepo.save(adrian);

    await this.orgRepo.save(easup);
    await this.orgRepo.save(oweme);

    const project1 = this.projectRepo.create({
      name: 'IO',
      description: 'IO project',
      details: null,
      organization: easup,
      boards: [],
      users: [patryk, maciek],
    });
    await this.projectRepo.save(project1);

    const project2 = this.projectRepo.create({
      name: 'CSV reader',
      description: 'CSV reader in Java',
      details: null,
      organization: oweme,
      boards: [],
      users: [maciek, adrian],
    });
    await this.projectRepo.save(project2);

    const project3 = this.projectRepo.create({
      name: 'Zombie game',
      description: 'Game where you can shoot zombies!',
      details: null,
      organization: oweme,
      boards: [],
      users: [patryk, adrian],
    });
    await this.projectRepo.save(project3);

    const project4 = this.projectRepo.create({
      name: 'Coin management',
      description: 'We do everything, but it leads to us doing nothing.',
      details: null,
      organization: oweme,
      boards: [],
      users: [patryk, adrian],
    });
    await this.projectRepo.save(project4);

    const board1 = this.boardRepo.create({
      name: 'Main',
      description: 'Main board',
      project: project1,
      sections: [],
    });
    await this.boardRepo.save(board1);

    const board2 = this.boardRepo.create({
      name: 'Adverts',
      description: 'Advertisement management',
      project: project1,
      sections: [],
    });
    await this.boardRepo.save(board2);

    const board3 = this.boardRepo.create({
      name: 'Main',
      description: 'Main board',
      project: project2,
      sections: [],
    });
    await this.boardRepo.save(board3);

    const board4 = this.boardRepo.create({
      name: 'Frontend',
      description: 'Frontend tasks',
      project: project2,
      sections: [],
    });
    await this.boardRepo.save(board4);

    const board5 = this.boardRepo.create({
      name: 'Backend',
      description: 'Special boards for backend',
      project: project2,
      sections: [],
    });
    await this.boardRepo.save(board5);

    const board6 = this.boardRepo.create({
      name: 'Graphics',
      description: 'Graphic related tasks',
      project: project3,
      sections: [],
    });
    await this.boardRepo.save(board6);

    const board7 = this.boardRepo.create({
      name: 'Game',
      description: 'Logic oriented tasks',
      project: project3,
      sections: [],
    });
    await this.boardRepo.save(board7);

    const board8 = this.boardRepo.create({
      name: 'Main',
      description: 'Main board',
      project: project4,
      sections: [],
    });
    await this.boardRepo.save(board8);

    const task1 = this.taskRepo.create({
      name: 'Task 1',
      description: 'Task 1 description',
      deadline: '2023-01-12',
      users: [patryk, maciek],
      sections: [],
    });
    this.taskRepo.save(task1);

    const task2 = this.taskRepo.create({
      name: 'Task 2',
      description: 'Task 2 description',
      deadline: '2023-01-12',
      users: [patryk, maciek, adrian],
      sections: [],
    });
    await this.taskRepo.save(task2);

    const section1 = this.sectionRepo.create({
      name: 'To do',
      description: null,
      board: board1,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section1);

    const section2 = this.sectionRepo.create({
      name: 'In progress',
      description: null,
      board: board1,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section2);

    const section3 = this.sectionRepo.create({
      name: 'Done',
      description: null,
      board: board1,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section3);

    const section4 = this.sectionRepo.create({
      name: 'TODO',
      description: 'Section 4 description',
      board: board2,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section4);

    const section5 = this.sectionRepo.create({
      name: 'DONE',
      description: 'Section 5 description',
      board: board2,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section5);

    const section6 = this.sectionRepo.create({
      name: 'All',
      description: 'All tasks',
      board: board3,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section6);

    const section7 = this.sectionRepo.create({
      name: 'BackLog',
      description: null,
      board: board4,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section7);

    const section8 = this.sectionRepo.create({
      name: 'In progress',
      description: null,
      board: board4,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section8);

    const section9 = this.sectionRepo.create({
      name: 'Review',
      description: null,
      board: board4,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section9);

    const section10 = this.sectionRepo.create({
      name: 'Done',
      description: null,
      board: board4,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section10);

    const section11 = this.sectionRepo.create({
      name: 'Todo',
      description: null,
      board: board5,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section11);

    const section12 = this.sectionRepo.create({
      name: 'Done',
      description: null,
      board: board5,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section12);

    const section13 = this.sectionRepo.create({
      name: 'Whatever',
      description: null,
      board: board6,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section13);

    const section14 = this.sectionRepo.create({
      name: 'TODO',
      description: null,
      board: board7,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section14);

    const section15 = this.sectionRepo.create({
      name: 'DOING',
      description: null,
      board: board7,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section15);

    const section16 = this.sectionRepo.create({
      name: 'DONE',
      description: null,
      board: board7,
      tasks: [task1, task2],
    });
    await this.sectionRepo.save(section16);
  }
}
