import { MikroORM } from "@mikro-orm/core";
import path from 'path';
import { __prod__ } from "./constants";
import { Article } from "./entities/article";
import { User } from "./entities/User";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        disableForeignKeys: false,
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Article, User],
    dbName: "blogins",
    user: "Harri",
    password:"admin",
    type: "postgresql",
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];