import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo])
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
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

  @Mutation(() => Boolean)
  removeTodo(@Args('id', { type: () => Int }) id: number): boolean {
    return this.todoService.removeTodo(id);
  }

  // Aggregations
  @Query(() => Int)
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int)
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }

  @Query(() => Int)
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      total: this.todoService.totalTodos,
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      totalCompletedTotos: this.todoService.totalTodos,
    };
  }
}
