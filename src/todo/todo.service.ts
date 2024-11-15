// src/todo/todo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { StatusEnum } from './status.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  //add
  async addTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    //const todo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(createTodoDto);
  }

  //update
  async updateTodo(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.update(id, updateTodoDto);
    return this.todoRepository.findOne({ where: { id } });
  }
  
  //delete
   // Hard delete (delete from database)
   async deleteTodoV1(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException(`Todo avec l'id ${id} non trouvé`);
    }
    // Remove the todo from the database
    await this.todoRepository.remove(todo);
  }

  // Soft delete (mark as deleted)
  async deleteTodoV2(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException(`Todo avec l'id ${id} non trouvé`);
    }
    // Mark the todo as deleted by setting deletedAt and isDeleted
    todo.deletedAt = new Date();

    await this.todoRepository.save(todo);
  }
  
    // Méthode pour restaurer un todo supprimé
    async restoreTodo(id: number){
      const todo = await this.todoRepository.query("select * from todo_entity where id = ?", [id]);
      if (!todo) {
        throw new NotFoundException(`todo of id ${id} not found`);
      }
        return this.todoRepository.restore(id);
      
    }



   // Méthode pour compter les Todos par statut
   async countTodosByStatus(): Promise<Record<StatusEnum, number>> {
    const counts = await this.todoRepository
      .createQueryBuilder("todo")
      .select("todo.status", "status")
      .addSelect("COUNT(todo.id)", "count")
      .groupBy("todo.status")
      .getRawMany();

    // Format results to match the StatusEnum keys
    const result = {
      [StatusEnum.IN_PROGRESS]: 0,
      [StatusEnum.COMPLETED]: 0,
      [StatusEnum.PENDING]: 0,
    };

    counts.forEach((entry) => {
      result[entry.status] = parseInt(entry.count, 10);
    });

    return result;
  }


  //getall
  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  //get by id
  async getTodoById(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }


    // Méthode combinée de recherche et pagination
    async getAll(
      page: number = 1,
      limit: number = 10,
      search: string = '',
      status?: StatusEnum
    ): Promise<any> {
      const qb = this.todoRepository.createQueryBuilder('todo');
  
      // Recherche par la chaîne dans le name et description
      if (search) {
        qb.andWhere(
          '(todo.name LIKE :search OR todo.description LIKE :search)',
          { search: `%${search}%` }
        );
      }
  
      // Recherche par statut
      if (status) {
        qb.andWhere('todo.status = :status', { status });
      }
  
      // Pagination
      qb.skip((page - 1) * limit).take(limit);
  
      // Exécution de la requête
      const [todos, total] = await qb.getManyAndCount();
  
      // Retourner les données avec les informations de pagination
      return {
        data: todos,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    }
  






  
}
