import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoInput } from './dto/input/create-todo.input';

@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo])
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo)
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Todo | NotFoundException {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.createTodo(createTodoInput);
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
