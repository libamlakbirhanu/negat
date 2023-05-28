import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'Users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ unique: true })
  @Field()
  user_name: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  first_name: string;

  @Column()
  @Field()
  last_name: string;

  @Column()
  @Field()
  gender: string;

  @Column('simple-array')
  @Field(() => [String])
  friends: string[] = [];

  @Column('simple-array')
  @Field(() => [String])
  going: string[] = [];

  @Column('simple-array')
  @Field(() => [String])
  interested: string[] = [];

  @Column('simple-array')
  @Field(() => [String])
  category_sub: string[] = [];

  @Column({ nullable: true })
  @Field({ nullable: true })
  avatar_id: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, Number(process.env.HASH_SALT));
  }
}