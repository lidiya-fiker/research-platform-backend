import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { User } from './auth/entity/user.entity';
import { ResearchPaper } from './paper/entity/researchPaper.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'kidiya',
  database: process.env.DB_NAME || 'researchPlatform',
  synchronize: true,
  logging: true,
  entities: [User, ResearchPaper],
};
