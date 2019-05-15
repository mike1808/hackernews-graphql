# HackerNews by Mikael

## Description

This is implementation of HackerNews using GraphQL and React.

## Installation

This application is managed by `yarn` and [yarn workspaces](https://yarnpkg.com/en/docs/workspaces). So you need to have `yarn` installed.

```bash
npm install -g yarn
```

Then in the project root do:

```
yarn install
```

It will install all packages both for `./client` and `./server`.


Then you need to create `server/.env` file. The sample content can be:

```
PORT=4000
HN_MONGO_URL=mongodb://root:example@localhost/hackernews?authSource=admin
```

You can modify `HN_MONGO_URL` env var if you have MongoDB installed, otherwise, you can start a Docker container using provider docker-compose file. Also, you can restore from the dump which populated the DB with the real HN posts.
The dump can be downloaded [here](https://transfer.sh/HPgP2/hackernews.archive) and placed in `dumps` folder. Otherwise, just run the following command which will do the same.

```
curl -sS https://transfer.sh/HPgP2/hackernews.archive -o dumps/hackernews.archive
```

Then you can create a MongoDB container with

```
docker-compose up -d mongo
```

And then you can start the server:

```
cd server 
yarn start
```

And start the client:

```
cd client
yarn start
```

