import { Module } from '@nestjs/common';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor-entity';
import { Event } from '../events/entities/event.entity';

// class MockCoffeesService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  // providers: [CoffeesService],
  // providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }],
  providers: [
    CoffeesService,
    { provide: COFFEE_BRANDS, useValue: ['inescafe', 'bottega'] },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
