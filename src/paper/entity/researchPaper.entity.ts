import { User } from 'src/auth/entity/user.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResearchPaper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { array: true })
  authors: string[];

  @Column()
  category: string;

  @Column('text', { array: true })
  keywords: string[];

  @Column('text', { nullable: true })
  abstract: string;

  @Column()
  fileUrl: string; // where the file is stored

  @Column('text')
  parsedText: string; // extracted text from PDF/DOCX

  @ManyToOne(() => User, (user) => user.papers)
  uploadedBy: User;

  @CreateDateColumn()
  createdAt: Date;
}
