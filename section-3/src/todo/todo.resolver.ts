import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoInput, UpdateTodoInput } from './dto/input';

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
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Todo {
    return this.todoService.createTodo(createTodoInput);
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ): Todo | NotFoundException {
    return this.todoService.updateTodo(updateTodoInput);
  }

  @Mutation(() => String)
  removeTodo() {
    // TODO
  }
}
