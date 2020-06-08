FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ -d "node_modules" ] && npm run start || npm ci && npm run start