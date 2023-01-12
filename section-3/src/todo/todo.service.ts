import { Injectable } from '@nestjs/common';
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

  findOne() {
    // TODO
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
