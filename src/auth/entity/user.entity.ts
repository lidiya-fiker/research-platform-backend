import { ResearchPaper } from 'src/paper/entity/researchPaper.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ResearchPaper, (paper) => paper.uploadedBy)
  papers: ResearchPaper[];
}
