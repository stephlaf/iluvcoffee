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
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(
    () => Flavor,
    (flavor) => flavor.coffees,
    { cascade: true }, // ['insert']
  )
  flavors: Flavor[];
}
