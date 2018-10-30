FROM node:stretch

WORKDIR /usr/src/app

COPY package*.json ./
RUN  npm install
COPY . .

RUN echo "Node version $(node --version)"

CMD ["npm", "run", "dev"]