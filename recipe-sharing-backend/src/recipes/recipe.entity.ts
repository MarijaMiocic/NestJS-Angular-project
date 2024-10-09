import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
// import { Like } from '../likes/like.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  ingredients: string;

  @Column()
  instructions: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => User, (user) => user.recipes, { eager: true })
  author: User;

//   @OneToMany(() => Like, (like) => like.recipe, { cascade: true })
//   userLikes: Like[];
}
