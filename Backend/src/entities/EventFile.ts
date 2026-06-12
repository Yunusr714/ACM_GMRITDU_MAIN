import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Event } from "./Event";

@Entity("event_files")
export class EventFile {
    @PrimaryColumn("varchar", { length: 255 })
    id: string;

    @Column()
    name: string;

    @Column("text")
    url: string;

    @Column()
    size: string;

    @ManyToOne(() => Event, (event) => event.files, { onDelete: "CASCADE" })
    @JoinColumn({ name: "event_id" })
    event: Event;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
}
