FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

# Copy all files except for those listed in .dockerignore (like node_modules)
COPY . .

CMD npm start