import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { StatusEnum } from '../status.enum';  

@Entity()
export class TodoEntity {
  static createQueryBuilder(arg0: string) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @CreateDateColumn({ type: 'datetime', update: false })//false: ne peut pas modifier
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;
}
