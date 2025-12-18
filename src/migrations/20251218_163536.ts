import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload"."enum_pages_country" AS ENUM('espana', 'italia', 'francia', 'reino-unido', 'alemania', 'paises-bajos', 'portugal', 'grecia', 'austria', 'belgica', 'republica-checa', 'irlanda', 'suiza', 'croacia', 'hungria', 'polonia', 'turquia', 'marruecos', 'estados-unidos', 'mexico', 'japon', 'tailandia');
  CREATE TYPE "payload"."enum_pages_continent" AS ENUM('europa', 'asia', 'america-norte', 'america-sur', 'africa', 'oceania');
  CREATE TYPE "payload"."enum__pages_v_version_country" AS ENUM('espana', 'italia', 'francia', 'reino-unido', 'alemania', 'paises-bajos', 'portugal', 'grecia', 'austria', 'belgica', 'republica-checa', 'irlanda', 'suiza', 'croacia', 'hungria', 'polonia', 'turquia', 'marruecos', 'estados-unidos', 'mexico', 'japon', 'tailandia');
  CREATE TYPE "payload"."enum__pages_v_version_continent" AS ENUM('europa', 'asia', 'america-norte', 'america-sur', 'africa', 'oceania');
  ALTER TABLE "payload"."pages" ADD COLUMN "country" "payload"."enum_pages_country";
  ALTER TABLE "payload"."pages" ADD COLUMN "city" varchar;
  ALTER TABLE "payload"."pages" ADD COLUMN "city_slug" varchar;
  ALTER TABLE "payload"."pages" ADD COLUMN "continent" "payload"."enum_pages_continent" DEFAULT 'europa';
  ALTER TABLE "payload"."_pages_v" ADD COLUMN "version_country" "payload"."enum__pages_v_version_country";
  ALTER TABLE "payload"."_pages_v" ADD COLUMN "version_city" varchar;
  ALTER TABLE "payload"."_pages_v" ADD COLUMN "version_city_slug" varchar;
  ALTER TABLE "payload"."_pages_v" ADD COLUMN "version_continent" "payload"."enum__pages_v_version_continent" DEFAULT 'europa';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."pages" DROP COLUMN "country";
  ALTER TABLE "payload"."pages" DROP COLUMN "city";
  ALTER TABLE "payload"."pages" DROP COLUMN "city_slug";
  ALTER TABLE "payload"."pages" DROP COLUMN "continent";
  ALTER TABLE "payload"."_pages_v" DROP COLUMN "version_country";
  ALTER TABLE "payload"."_pages_v" DROP COLUMN "version_city";
  ALTER TABLE "payload"."_pages_v" DROP COLUMN "version_city_slug";
  ALTER TABLE "payload"."_pages_v" DROP COLUMN "version_continent";
  DROP TYPE "payload"."enum_pages_country";
  DROP TYPE "payload"."enum_pages_continent";
  DROP TYPE "payload"."enum__pages_v_version_country";
  DROP TYPE "payload"."enum__pages_v_version_continent";`)
}
