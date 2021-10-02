FROM node:current-alpine

LABEL maintainer="Raul de Hevia"

# set default dir
WORKDIR /home/client
# copy app code
COPY . .
# install dependencies
RUN npm install
# expose port
EXPOSE 3000
# start app
CMD ["npm", "start"]