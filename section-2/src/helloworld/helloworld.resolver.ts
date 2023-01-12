import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {
  @Query(() => String, {
    name: 'hello',
    description: 'Hola mundo es lo que retorna',
  })
  helloWorld(): string {
    return 'Hello World';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomNumberFromZero',
    description: 'From zero to argument to',
  })
  getRandomNumberFromZero(@Args('to', { type: () => Int }) to: number) {
    return Math.floor(Math.random() * to);
  }
}
