import { Injectable, Module, Scope } from '@nestjs/common';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor-entity';
import { Event } from '../events/entities/event.entity';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

// class MockCoffeesService {}
// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

// @Injectable()
// export class CoffeBrandsFactory {
//   create() {
//     // DO something
//     return ['inescafe', 'bottega'];
//   }
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['inescafe', 'bottega'],
      scope: Scope.TRANSIENT,
    },
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: async (connection: Connection): Promise<string[]> => {
    //     // const coffeeBrands = await connection.query('SELECT * ...');
    //     const coffeeBrands = await Promise.resolve(['inescafe', 'bottega']);
    //     console.log('ASYNC Function');

    //     return coffeeBrands;
    //   },
    //   inject: [Connection],
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
