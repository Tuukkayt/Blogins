import { Article } from "../entities/Article";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class ArticleResolver {

    @Query(() => [Article])
    articles(@Ctx() {em}: MyContext): Promise<Article[]>{
        return em.find(Article, {});
    }

    @Query(() => Article, {nullable: true})
    article(
        @Arg("id", () => Int) id:number,
        @Ctx() {em}: MyContext): Promise<Article | null>{
            return em.findOne(Article, {id});
    }

    @Mutation(() => Article)
    async createArticle(
        @Arg("title", () => String) title:string,
        @Ctx() {em}: MyContext): Promise<Article>{
            const article = em.create(Article, {title});
            await em.persistAndFlush(article);
            return article;
        } 
}