import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("team_members")
export class TeamMember {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    category: string; // 'faculty' or 'team'

    @Column("text", { nullable: true })
    image: string;

    @Column({ name: "github_url", nullable: true })
    githubUrl: string;

    @Column({ name: "linkedin_url", nullable: true })
    linkedinUrl: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
