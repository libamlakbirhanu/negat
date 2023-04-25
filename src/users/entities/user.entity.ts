import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Users' })
@ObjectType()
export class User {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  first_name: string;

  @Column()
  @Field()
  last_name: string;
}
