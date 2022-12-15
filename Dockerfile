FROM node:18
WORKDIR /usr/app/frontend
COPY package.json .
RUN yarn install 
COPY . .
