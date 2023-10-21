FROM node:16

RUN apt-get update && apt-get install -y vim

WORKDIR /app

COPY js-client/package.json js-client/yarn.lock /app/
RUN yarn install
COPY js-client/ /app/

CMD ["node", "index.js"]
