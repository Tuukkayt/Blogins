import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { ArticleResolver } from './resolvers/article';
import { UserResolver } from './resolvers/user';

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ArticleResolver, UserResolver],
            validate: false
        }),
        context: ({req, res}) => ({ em: orm.em, req, res})
    });

    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log("Listening port localhost:4000")
    });
};

main().catch(err => {
    console.log(err);
});

