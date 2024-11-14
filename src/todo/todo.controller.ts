// src/todo/todo.controller.ts
import { Controller, Post, Body, Put, Param, Delete, Version, Get, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { StatusEnum } from './status.enum';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}


  //add
  @Post()
  async addTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.addTodo(createTodoDto);
  }

//update
  @Put(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoService.updateTodo(id, updateTodoDto);
  }
//delete
  // Version 1 - Normal delete (hard delete)
  @Delete(':id')
  @Version('1')
  async deleteTodoV1(@Param('id') id: number): Promise<{ message: string }> {
    await this.todoService.deleteTodoV1(id);
    return {
      message: `Todo with ID ${id} has been successfully deleted (Hard delete).`,
    };
  }

  // Version 2 - Soft delete (mark as deleted)
  @Delete('soft/:id')
  @Version('2')
  async deleteTodoV2(@Param('id') id: number): Promise<{ message: string }> {
    await this.todoService.deleteTodoV2(id);
    return {
      message: `Todo with ID ${id} has been successfully deleted (soft delete).`,
    };
  }

    // Restaurer un todo supprimé
    @Put('restore/:id')
    async restoreTodo(@Param('id') id: number) {
      return this.todoService.restoreTodo(id);
    }



    // Endpoint pour récupérer le nombre de todos par statut
    @Get('count-stat')
    async getCountTodosByStatus() {
      return await this.todoService.countTodosByStatus();
    }

    //getall
    @Get('/all')
    async getAllTodos() {
      return await this.todoService.getAllTodos();
    }

    //get by id
    @Get(':id')
  async getTodoById(@Param('id') id: number) {
    return await this.todoService.getTodoById(id);
  }


  // Endpoint GET /todos avec recherche et pagination
  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('status') status?: StatusEnum,
  ) {
    return await this.todoService.getAll(page, limit, search, status);
  }






}
