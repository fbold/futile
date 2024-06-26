#!/bin/sh

# Apply migrations
npx prisma migrate dev

exec "$@"
