import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'PoutPout',
      brand: 'Nespresso',
      flavors: ['burnt', 'nuts'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find(item => item.id === parseInt(id));

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);

    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if(existingCoffee) {
      // update existingCoffee
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === parseInt(id));
    if(coffeeIndex >=0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
