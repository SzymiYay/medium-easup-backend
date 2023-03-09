import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { Organization } from './Organization';
import { Project } from './Project';
import { Task } from './Task';

@Entity()
export class Person {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'user_id',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'email',
  })
  email: string;

  @Column({
    type: 'text',
    name: 'first_name',
  })
  name: string;

  @Column({
    type: 'text',
    name: 'last_name',
  })
  surname: string;

  @Column({
    type: 'text',
    name: 'nickname',
  })
  nickname: string;

  @Column({
    type: 'text',
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    name: 'photo',
    nullable: true,
  })
  photo: string;

  @ManyToMany(() => Task, (task) => task.users)
  @JoinTable()
  tasks: Task[];

  @ManyToMany(() => Project, (project) => project.users, { cascade: true })
  projects: Project[];

  @ManyToMany(() => Organization, (organization) => organization.users)
  organizations: Organization[];
}
