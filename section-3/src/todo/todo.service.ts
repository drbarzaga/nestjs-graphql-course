import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, UpdateTodoInput } from './dto/input';
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

  createTodo(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    todo.description = createTodoInput.description;
    todo.done = false;

    this.todos.push(todo);
    return todo;
  }

  updateTodo(updateTodoInput: UpdateTodoInput): Todo | NotFoundException {
    const { id, description, done } = updateTodoInput;
    const todo = this.findOne(id);
    const todoToUpdate = todo as Todo;
    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;
    this.todos = this.todos.map((item) => {
      return item.id === todoToUpdate.id ? todoToUpdate : item;
    });

    return todoToUpdate;
  }

  removeTodo() {
    // TODO
  }
}
