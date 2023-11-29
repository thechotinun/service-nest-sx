import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity({
  schema: 'public',
  name: 'posts',
  synchronize: false,
})
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postedAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  postedBy: string;

  @Column({ type: 'text', array: true, nullable: false })
  tags: string[];
}
