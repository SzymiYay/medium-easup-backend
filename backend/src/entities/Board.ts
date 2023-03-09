import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project';
import { Section } from './Section';

@Entity()
export class Board {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'board_id',
  })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ManyToOne(() => Project, (project) => project.boards, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @OneToMany(() => Section, (section) => section.board)
  sections: Section[];
}
