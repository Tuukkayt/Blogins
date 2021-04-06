import { Migration } from '@mikro-orm/migrations';

export class Migration20210404083530 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "article" drop constraint if exists "article_title_check";');
    this.addSql('alter table "article" alter column "title" type text using ("title"::text);');
  }

}
