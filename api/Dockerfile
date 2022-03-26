FROM strapi/base

WORKDIR /srv/app

COPY ./app/package.json ./
COPY ./app/package-lock.json ./

RUN npm install

COPY ./app .

ENV NODE_ENV production
ENV VITE_FULL_URL "technikapp.elsetech.cloud"
ENV VITE_API_URL "technikapp-api.elsetech.cloud"

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]