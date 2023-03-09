import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './Board';
import { Task } from './Task';

@Entity()
export class Section {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'section_id',
  })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ManyToOne(() => Board, (board) => board.sections, { onDelete: 'CASCADE' })
  board: Board;

  @ManyToMany(() => Task, (task) => task.sections)
  @JoinTable()
  tasks: Task[];
}
