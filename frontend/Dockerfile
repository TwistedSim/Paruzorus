FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
ADD . ./
RUN yarn build


FROM build-stage
COPY --from=build-stage /app/build /var/paruzorus/www/
RUN yarn global add serve


CMD ["serve", "-s", "/var/paruzorus/www/", "-l", "3000"]


