FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration=production


FROM nginx:latest

#COPY --from=build /dist/client/browser/ /usr/share/nginx/html
COPY --from=build /app/dist/client/browser/ /usr/share/nginx/html


EXPOSE 80
