#!/usr/bin/env sh

mongorestore -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase=admin --archive < /docker-entrypoint-initdb.d/hackernews.archive
