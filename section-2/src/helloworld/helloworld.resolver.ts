import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {
  @Query(() => String)
  helloWorld(): string {
    return 'Hello World';
  }
}
