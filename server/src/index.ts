import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { ArticleResolver } from './resolvers/article';
import { UserResolver } from './resolvers/user';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __prod__ } from './constants';
import {MyContext} from './types';


const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up();

    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient()

    app.use(
    session({
        name: 'asd',
        store: new RedisStore({ 
            client: redisClient, 
            disableTouch: true
        }),
        cookie: {
            maxAge: 10*365*24*60*60*1000,
            httpOnly: true,
            sameSite: "lax",
            secure: __prod__
        },
        saveUninitialized: false,
        secret: 'fdgjhbdsfgjhsbdf',
        resave: false,
    })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ArticleResolver, UserResolver],
            validate: false
        }),
        context: ({req, res}): MyContext => ({ em: orm.em, req, res})
    });

    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log("Listening port localhost:4000")
    });
};

main().catch(err => {
    console.log(err);
});

