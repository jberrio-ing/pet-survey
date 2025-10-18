import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pets' })
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  imageUrl: string;

  @Column({ default: 0 })
  totalVotes: number;
}
