#!/bin/sh

# Apply migrations
npx prisma migrate deploy

exec "$@"
