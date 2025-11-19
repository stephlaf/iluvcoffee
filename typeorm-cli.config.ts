import { DataSource } from 'typeorm';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor-entity';
// import { CoffeeRefactor1761943612355 } from 'src/migrations/1761943612355-CoffeeRefactor';
import { SchemaSync1761945001886 } from 'src/migrations/1761945001886-SchemaSync';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'pass123',
  database: 'iluvcoffee',
  entities: [Coffee, Flavor],
  migrations: [
    // CoffeeRefactor1761943612355,
    SchemaSync1761945001886,
  ],
});
