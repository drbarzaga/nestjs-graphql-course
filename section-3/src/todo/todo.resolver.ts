import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';

@Resolver()
export class TodoResolver {
  @Query(() => [Todo])
  findAll(): Todo[] {
    return [];
  }

  @Query(() => String)
  findOne() {
    // TODO
  }

  @Mutation(() => String)
  createTodo() {
    // TODO
  }

  @Mutation(() => String)
  updateTodo() {
    // TODO
  }

  @Mutation(() => String)
  removeTodo() {
    // TODO
  }
}
