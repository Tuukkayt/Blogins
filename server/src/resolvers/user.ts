import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import argon2 from 'argon2';

@InputType()
class CredentialInput{
    @Field()
    username: string
    @Field()
    password: string
}
@ObjectType()
class ErrorType{
    @Field()
    type: string;

    @Field()
    message: string;
}
@ObjectType()
class UserResponse{
    @Field(() => [ErrorType], {nullable: true})
    errors?: ErrorType[]

    @Field(() => User, {nullable: true})
    user?: User
}
@Resolver()
export class UserResolver{
    @Mutation(() => UserResponse)
    async register(
        @Arg('credentials') credentials: CredentialInput,
        @Ctx() {em}: MyContext
    ): Promise<UserResponse> {
        if(credentials.username.length === 0){
            return{
                errors: [{
                    type: "username",
                    message: "Username is empty"
                }]
            }
        }

        if(credentials.password.length < 3){
            return {
                errors: [{
                    type: "password",
                    message: "Password too short"
                }]
            }
        }
        const passwordHash = await argon2.hash(credentials.password);
        const user = em.create(User, {
            username: credentials.username,
            password: passwordHash 
        });

        try{
            await em.persistAndFlush(user);
        }catch(err){
            if(err.code === "23505"){
                return {
                    errors: [{
                        type: "username",
                        message: "username taken"
                    }]
                }
            }
        }
        return {user};
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('credentials') credentials: CredentialInput,
        @Ctx() {em}: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, {username: credentials.username});
        if(!user){
            return {
                errors: [{
                    type: "username",
                    message: "Username doesn't exist"
                }]
            }
        }
        const validatePassword = await argon2.verify(user.password, credentials.password);
        if(!validatePassword){
            return{
                errors: [{
                    type: "password",
                    message: "Wrong password!"
                }]
            }
        }
        return {user};
    }
}