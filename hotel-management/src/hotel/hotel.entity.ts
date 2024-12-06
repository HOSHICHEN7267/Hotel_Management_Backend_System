import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hotels')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  webLink: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  status: number;

  @Column()
  coordinate: string;
}
