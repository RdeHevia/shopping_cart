# FROM <image>:<tag>
# FROM ubuntu:20.04
FROM node:14

WORKDIR /usr/src/app

# add app
COPY . ./

# RUN <install some dependencies>
RUN npm install

EXPOSE 3000

# CMD <command that is executed on `docker container run`>
CMD ["npm", "start"]