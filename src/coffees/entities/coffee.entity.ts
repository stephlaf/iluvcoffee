import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Flavor } from './flavor-entity';

@Entity() // sql table === 'coffee' OR custom ('coffees')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  brand: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany(
    () => Flavor,
    (flavor) => flavor.coffees,
    { cascade: true }, // ['insert']
  )
  flavors: Flavor[];
}
