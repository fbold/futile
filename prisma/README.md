### Generate the create database SQL (generated.sql)

This file is run if creating a new database, recreating container.
To create it run:

```
npx prisma migrate diff --from-empty --to-schema-datasource prisma/schema.prisma --script > prisma/generated.sql
```

### Migrations

Migrations are for when you're making changes to database. These should also be automatically run when creating container. These can be reated by running:

```
npx prisma migrate dev
```
