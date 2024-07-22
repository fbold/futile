### When make a change to the schema

This generated all the types and stuff so using prisma is easy and works.

```
npx prisma generate
```

### Generate the create database SQL (generated.sql)

Pretty sure this can be replaced by the stuff below.

This file is run if creating a new database, recreating container.
To create it run:

```
npx prisma migrate diff --from-empty --to-schema-datasource prisma/schema.prisma --script > prisma/generated.sql
```

### Migrations

Migrations are for when you're making changes to database. These should also be automatically run when creating container. These can be created by running:

```
npx prisma migrate dev
```

When the container is run on the VPS there is an entrypoint (/entrypoint.sh) that applies the migrations. There are kept track of by prisma using a table in db called \_prisma_migrations
