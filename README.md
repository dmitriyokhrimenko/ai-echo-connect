<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/marketplace-facebook.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p>The trading platform agent provides management of the marketplace accounts fleet of accounts via a Telegram bot.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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
# production
$ docker run -d --name ai-echo-connect -p 3005:3005 ai-echo-connect:prod-latest

# development
$ docker run -d --name ai-echo-connect-dev -p 3010:3005 ai-echo-connect:dev-latest
```

## Debug

```bash
$ docker run --entrypoint sh -it ai-echo-connect:prod-latest
```