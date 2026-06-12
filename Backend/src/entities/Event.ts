import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { EventFile } from "./EventFile";

@Entity("events")
export class Event {
    @PrimaryColumn("varchar", { length: 255 })
    id: string;

    @Column()
    title: string;

    @Column()
    date: string;

    @Column()
    category: string;

    @Column("text")
    desc: string;

    @Column("text")
    image: string;

    @Column({ name: "register_url", nullable: true })
    registerUrl: string;

    @Column("text", { nullable: true })
    overview: string;

    @Column({ nullable: true })
    venue: string;

    @Column("json", { nullable: true })
    details: any;

    @OneToMany(() => EventFile, (file) => file.event, { cascade: true, eager: true })
    files: EventFile[];

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
