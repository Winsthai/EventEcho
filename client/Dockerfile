FROM node:lts AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# Need to deploy frontend using webserver somehow
# FROM nginx:1.25-alpine

# # COPY the directory dist from the build-stage to /usr/share/nginx/html
# # The target location here was found from the Docker hub page
# COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html