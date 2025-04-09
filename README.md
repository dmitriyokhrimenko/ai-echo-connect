## Description

Backend API

## Project setup

```bash
$ npm install
```

## Build docker image

```bash
# build development image
$ docker build -f docker/Dockerfile . -t ai-echo-connect-v1:dev-latest --target development

## run in watch mode (typescript without docker)
#$ npm run start:dev

# build production image
$ docker build -f docker/Dockerfile . -t ai-echo-connect-v1:prod-latest --target production
```

## Run the project in docker

```bash

# development
$ docker run -d --name ai-echo-connect-v1-dev -p 3010:3005 ai-echo-connect-v1:dev-latest

# production
$ docker run -d --name ai-echo-connect-v1 -p 3005:3005 ai-echo-connect-v1:prod-latest
```

## Debug

```bash
$ docker run --entrypoint sh -it ai-echo-connect-v1:prod-latest
```