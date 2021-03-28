FROM node:lts-alpine AS install-stage
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
ADD . ./

FROM install-stage AS build-stage
WORKDIR /app
ADD . ./
COPY --from=install-stage /app/node_modules ./
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build-stage /app/build /var/paruzorus/www/
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
