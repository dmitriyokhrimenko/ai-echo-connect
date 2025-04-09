## Description

Backend API

## Project setup

```bash
$ npm install
```

## Build docker image

```bash
# build development image
$ docker build -f docker/Dockerfile . -t ai-echo-connect:dev-latest --target development

## run in watch mode (typescript without docker)
#$ npm run start:dev

# build production image
$ docker build -f docker/Dockerfile . -t ai-echo-connect:prod-latest --target production
```

## Run the project in docker

```bash

# development
$ docker run -d --name ai-echo-connect-dev -p 3010:3005 ai-echo-connect:dev-latest

# production
$ docker run -d --name ai-echo-connect -p 3005:3005 ai-echo-connect:prod-latest
```

## Debug

```bash
$ docker run --entrypoint sh -it ai-echo-connect:prod-latest
```