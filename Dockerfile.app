FROM node:alpine

WORKDIR /usr/src/app
COPY app .

RUN npm install -s --no-progress

CMD ["npm", "start"]
