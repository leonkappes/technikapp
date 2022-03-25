FROM strapi/base

WORKDIR /srv/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

RUN mpm run build

EXPOSE 1337

CMD ["npm", "run", "start"]