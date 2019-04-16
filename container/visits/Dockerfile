FROM node:alpine

WORKDIR '/app'

COPY package.json .
run npm install
COPY . .

CMD ["npm", "start"]