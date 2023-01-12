import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo])
  findAll(): Todo[] {
    return this.todoService.findAll();
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
