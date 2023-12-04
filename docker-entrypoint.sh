#!/bin/sh

# Starting server...
echo "Starting migrations..."

# Run npm run start
npm run typeorm:run-migrations

npm run start