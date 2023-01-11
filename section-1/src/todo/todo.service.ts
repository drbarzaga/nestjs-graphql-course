import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Piedra del Alma',
      done: false,
    },
    {
      id: 2,
      description: 'Piedra del Tiempo',
      done: false,
    },
    {
      id: 3,
      description: 'Piedra del Espacio',
      done: false,
    },
  ];

  create(createTodoDto: CreateTodoDto) {
    const todo = new Todo();
    todo.id = this.todos.at(this.todos.length - 1).id + 1;
    todo.description = createTodoDto.description;
    todo.done = false;
    this.todos.push(todo);
    return todo;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: number) {
    const todo = this.todos.find((todo) => +todo.id === id);
    if (!todo) {
      throw new HttpException(`Todo ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);

    const { description, done } = updateTodoDto;
    if (done !== undefined) {
      todo.done = done;
    }
    if (description) {
      todo.description = description;
    }
    this.todos = this.todos.map((_todo) => {
      if (_todo.id === id) {
        return todo;
      }
      return _todo;
    });

    return todo;
  }

  remove(id: number) {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
