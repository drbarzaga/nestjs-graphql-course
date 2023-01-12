import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Pieda del alma',
      done: false,
    },
    {
      id: 2,
      description: 'Pieda del espacio',
      done: false,
    },
    {
      id: 3,
      description: 'Pieda del poder',
      done: false,
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo | NotFoundException {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found.`);
    }
    return todo;
  }

  createTodo() {
    // TODO
  }

  updateTodo() {
    // TODO
  }

  removeTodo() {
    // TODO
  }
}
