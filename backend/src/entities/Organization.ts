import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project';
import { Person } from './Person';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'organization_id',
  })
  id: number;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  mission: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  webpage: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  logo: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  details: string;

  @OneToMany(() => Project, (project) => project.organization)
  projects: Project[];

  @ManyToMany(() => Person, (user) => user.organizations)
  @JoinTable()
  users: Person[];
}
