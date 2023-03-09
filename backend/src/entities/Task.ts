import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./Section";
import { Person } from "./Person";

@Entity()
export class Task {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'task_id'
    })
    id: number

    @Column({
        type: 'text'
    })
    name: string

    @Column({
        type: 'text',
        nullable: true
    })
    description: string

    @Column({
        type: 'date',
        nullable: true
    })
    deadline: string

    @ManyToMany(() => Person, user => user.tasks)
    users: Person[]

    @ManyToMany(() => Section, section => section.tasks)
    sections: Section[]
}