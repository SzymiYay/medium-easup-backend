import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './Board';
import { Organization } from './Organization';
import { Person } from './Person';

@Entity()
export class Project {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'project_id',
  })
  id: number;

  @Column({ type: 'text' })
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
  details: string;

  @ManyToOne(() => Organization, (organization) => organization.projects, {
    onDelete: 'CASCADE',
  })
  organization: Organization;

  @OneToMany(() => Board, (board) => board.project)
  boards: Board[];

  @ManyToMany(() => Person, (user) => user.projects)
  @JoinTable()
  users: Person[];
}
