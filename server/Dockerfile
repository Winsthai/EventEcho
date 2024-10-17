FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

# Copy all files except for those listed in .dockerignore (like node_modules)
COPY . .

CMD bash -c 'while !</dev/tcp/db/5432; do sleep 1; done; npm start'